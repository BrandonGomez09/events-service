import { IEventRepository } from "../../domain/interfaces/IEventRepository";
import { IEventRegistrationRepository } from "../../domain/interfaces/IEventRegistrationRepository";
import { IAuthService } from "../../domain/interfaces/IAuthService";
import { IKitchenService } from "../../domain/interfaces/IKitchenService";

export class GetRegistrationsByEventUseCase {
  constructor(
    private eventRepository: IEventRepository,
    private registrationRepository: IEventRegistrationRepository,
    private authService: IAuthService,
    private kitchenService: IKitchenService
  ) {}

  public async execute(token: string, eventId: number) {
    const user = await this.authService.getUserFromToken(token);
    
    const event = await this.eventRepository.findById(eventId);
    if (!event) {
      throw { http_status: 404, message: "Event not found" };
    }

    const kitchen = await this.kitchenService.getKitchenById(event.kitchenId, token);

    const isKitchenOwner =
      user.roles.includes("Admin_cocina") && Number(kitchen.ownerId) === Number(user.id);
      
    const isRegistered = await this.registrationRepository.findUserRegistration(
      eventId,
      user.id
    );

    if (!isKitchenOwner && !isRegistered) {
      throw {
        http_status: 403,
        message: "You must be registered or be the kitchen owner to see participants",
      };
    }

    return await this.registrationRepository.findByEvent(eventId);
  }
}