import { IEventRegistrationRepository } from "../../domain/interfaces/IEventRegistrationRepository";
import { IAuthService } from "../../domain/interfaces/IAuthService";
import { IEventRepository } from "../../domain/interfaces/IEventRepository";

export class GetUserRegistrationsUseCase {
  constructor(
    private registrationRepository: IEventRegistrationRepository,
    private authService: IAuthService,
    private eventRepository: IEventRepository 
  ) {}

  public async execute(token: string) {
    const user = await this.authService.getUserFromToken(token);
    const registrations = await this.registrationRepository.findByUser(user.id);

    const enrichedRegistrations = await Promise.all(
      registrations.map(async (reg) => {
        const eventData = await this.eventRepository.findById(reg.eventId);

        return {
          ...reg, 
          event: eventData || null 
        };
      })
    );

    return enrichedRegistrations;
  }
}