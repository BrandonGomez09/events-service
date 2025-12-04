import { Repository } from "typeorm";
import { AppDataSource } from "../../config/data-source";
import { EventRegistrationSchema } from "../../database/schemas/event-registration.schema";
import { IEventRegistrationRepository } from "../../domain/interfaces/IEventRegistrationRepository";
import { EventRegistration } from "../../domain/entities/EventRegistration";

export class EventRegistrationRepositoryAdapter
  implements IEventRegistrationRepository
{
  private repository: Repository<EventRegistrationSchema>;

  constructor() {
    this.repository = AppDataSource.getRepository(EventRegistrationSchema);
  }

  async register(reg: EventRegistration): Promise<EventRegistration> {
    const created = this.repository.create(reg as any);
    const saved = await this.repository.save(created);
    return saved as any;
  }


  async unregister(eventId: number, userId: number): Promise<void> {
    await this.repository.delete({ eventId, userId } as any);
  }

  async findByEvent(eventId: number): Promise<EventRegistration[]> {
    return (await this.repository.find({ where: { eventId } })) as any;
  }

  async findByUser(userId: number): Promise<EventRegistration[]> {
    return (await this.repository.find({ 
      where: { userId },
      order: { createdAt: "DESC" } 
    })) as any;
  }

  async findUserRegistration(
    eventId: number,
    userId: number
  ): Promise<EventRegistration | null> {
    return (await this.repository.findOne({
      where: { eventId, userId },
    })) as any;
  }

  async countByEvent(eventId: number): Promise<number> {
    return await this.repository.count({ where: { eventId } });
  }

  async deleteAllByEventId(eventId: number): Promise<void> {
    await this.repository.delete({ eventId } as any);
  }

}