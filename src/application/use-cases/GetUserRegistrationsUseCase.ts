import { IEventRegistrationRepository } from "../../domain/interfaces/IEventRegistrationRepository";
import { IAuthService } from "../../domain/interfaces/IAuthService";

export class GetUserRegistrationsUseCase {
  constructor(
    private registrationRepository: IEventRegistrationRepository,
    private authService: IAuthService
  ) {}

  public async execute(token: string) {
    const user = await this.authService.getUserFromToken(token);
    const registrations = await this.registrationRepository.findByUser(user.id);

    return registrations;
  }
}