import { IEventRepository } from "../../domain/interfaces/IEventRepository";
import { IAuthService } from "../../domain/interfaces/IAuthService";
import { IKitchenService } from "../../domain/interfaces/IKitchenService";
import { IAuditLogRepository } from "../../domain/interfaces/IAuditLogRepository";

import { Event } from "../../domain/entities/Event";
import { EventValidator } from "../../domain/validators/EventValidator";
import { AuditLog } from "../../domain/entities/AuditLog";

export class CreateEventUseCase {
  constructor(
    private eventRepository: IEventRepository,
    private authService: IAuthService,
    private kitchenService: IKitchenService,
    private auditLogRepository: IAuditLogRepository
  ) {}

  public async execute(token: string, data: any): Promise<Event> {
    const user = await this.authService.getUserFromToken(token);
    
    if (!user.roles.includes("Admin_cocina")) {
      throw { http_status: 403, message: "Only kitchen admins can create events" };
    }

    const kitchen = await this.kitchenService.getKitchenById(data.kitchenId, token);
    
    if (kitchen.ownerId !== user.id) {
      throw { http_status: 403, message: "You cannot create events for this kitchen" };
    }

    const event = new Event(
      data.kitchenId,
      data.name,
      data.description || null,
      data.eventType,
      data.eventDate,
      data.startTime,
      data.endTime,
      data.expectedDiners || null,
      data.maxCapacity,
      "active",
      null,
      user.id,
      null,
      null
    );

    const validator = new EventValidator(event);
    await validator.validateWithCustomRules();

    const saved = await this.eventRepository.create(event);
    
    const audit = new AuditLog(
      user.id,
      "event_created",
      "event",
      saved.id! 
    );
    await this.auditLogRepository.log(audit);

    return saved;
  }
}