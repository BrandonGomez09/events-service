import { IEventRepository } from "../../domain/interfaces/IEventRepository";
import { IAuthService } from "../../domain/interfaces/IAuthService";
import { IKitchenService } from "../../domain/interfaces/IKitchenService";
import { IAuditLogRepository } from "../../domain/interfaces/IAuditLogRepository";
import { AuditLog } from "../../domain/entities/AuditLog";
import { IEventRegistrationRepository } from "../../domain/interfaces/IEventRegistrationRepository";

export class DeleteEventUseCase {
  constructor(
    private eventRepository: IEventRepository,
    private authService: IAuthService,
    private kitchenService: IKitchenService,
    private auditLogRepository: IAuditLogRepository,
    private registrationRepository: IEventRegistrationRepository
  ) {}

  public async execute(token: string, eventId: number): Promise<void> {
    const user = await this.authService.getUserFromToken(token);
    
    if (!user.roles.includes("Admin_cocina")) {
      throw { http_status: 403, message: "Only kitchen admins can delete events" };
    }

    const event = await this.eventRepository.findById(eventId);
    if (!event) {
      throw { http_status: 404, message: "Event not found" };
    }

    const kitchen = await this.kitchenService.getKitchenById(event.kitchenId, token);
    
    if (Number(kitchen.ownerId) !== Number(user.id)) {
      throw { http_status: 403, message: "You cannot delete this event" };
    }

    // 1. 👇 PRIMERO BORRAMOS LAS INSCRIPCIONES (Limpieza)
    await this.registrationRepository.deleteAllByEventId(eventId);

    await this.eventRepository.delete(eventId);

    const audit = new AuditLog(
      user.id,            
      "event_deleted",    
      "event",            
      eventId             
    );
    await this.auditLogRepository.log(audit);
  }
}