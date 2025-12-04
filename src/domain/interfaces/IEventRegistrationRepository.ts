import { EventRegistration } from "../entities/EventRegistration";

export interface IEventRegistrationRepository {
  register(data: EventRegistration): Promise<EventRegistration>;

  unregister(eventId: number, userId: number): Promise<void>;

  findByEvent(eventId: number): Promise<EventRegistration[]>;

  findByUser(userId: number): Promise<EventRegistration[]>;

  findUserRegistration(eventId: number, userId: number): Promise<EventRegistration | null>;

  countByEvent(eventId: number): Promise<number>;

  deleteAllByEventId(eventId: number): Promise<void>;
}
