import { EventRepositoryAdapter } from "../../adapters/event.repository.adapter";
import { EventRegistrationRepositoryAdapter } from "../../adapters/event-registration.repository.adapter";
import { EventSubscriptionRepositoryAdapter } from "../../adapters/event-subscription.repository.adapter";
import { AuditLogRepositoryAdapter } from "../../adapters/audit-log.repository.adapter";

import { AuthServiceAdapter } from "../../adapters/auth-service.adapter";
import { KitchenServiceAdapter } from "../../adapters/kitchen-service.adapter";

import { CreateEventUseCase } from "../../../application/use-cases/CreateEventUseCase";
import { UpdateEventUseCase } from "../../../application/use-cases/UpdateEventUseCase";
import { DeleteEventUseCase } from "../../../application/use-cases/DeleteEventUseCase";
import { GetEventByIdUseCase } from "../../../application/use-cases/GetEventByIdUseCase";
import { GetEventsByKitchenUseCase } from "../../../application/use-cases/GetEventsByKitchenUseCase";
import { RegisterToEventUseCase } from "../../../application/use-cases/RegisterToEventUseCase";
import { UnregisterFromEventUseCase } from "../../../application/use-cases/UnregisterFromEventUseCase";
import { GetRegistrationsByEventUseCase } from "../../../application/use-cases/GetRegistrationsByEventUseCase";

import { GetUserRegistrationsUseCase } from "../../../application/use-cases/GetUserRegistrationsUseCase";

import { SubscribeToKitchenEventsUseCase } from "../../../application/use-cases/SubscribeToKitchenEventsUseCase";
import { UnsubscribeFromKitchenEventsUseCase } from "../../../application/use-cases/UnsubscribeFromKitchenEventsUseCase";
import { GetKitchenSubscriptionsUseCase } from "../../../application/use-cases/GetKitchenSubscriptionsUseCase";

import { CreateEventController } from "../controllers/create-event.controller";
import { UpdateEventController } from "../controllers/update-event.controller";
import { DeleteEventController } from "../controllers/delete-event.controller";
import { GetEventByIdController } from "../controllers/get-event-by-id.controller";
import { GetEventsByKitchenController } from "../controllers/get-events-by-kitchen.controller";

import { RegisterToEventController } from "../controllers/register-to-event.controller";
import { UnregisterFromEventController } from "../controllers/unregister-from-event.controller";
import { GetRegistrationsByEventController } from "../controllers/get-registrations-by-event.controller";

import { GetUserRegistrationsController } from "../controllers/get-user-registrations.controller";

import { SubscribeToKitchenController } from "../controllers/subscribe-to-kitchen.controller";
import { UnsubscribeFromKitchenController } from "../controllers/unsubscribe-from-kitchen.controller";
import { GetKitchenSubscriptionsController } from "../controllers/get-kitchen-subscriptions.controller";

export const eventRepository = new EventRepositoryAdapter();
export const eventRegistrationRepository = new EventRegistrationRepositoryAdapter();
export const eventSubscriptionRepository = new EventSubscriptionRepositoryAdapter();
export const auditLogRepository = new AuditLogRepositoryAdapter();
export const authService = new AuthServiceAdapter();
export const kitchenService = new KitchenServiceAdapter();

export const createEventUseCase = new CreateEventUseCase(
  eventRepository,
  authService,
  kitchenService,
  auditLogRepository
);
export const updateEventUseCase = new UpdateEventUseCase(
  eventRepository,
  authService,
  kitchenService
);
export const deleteEventUseCase = new DeleteEventUseCase(
  eventRepository,
  authService,
  kitchenService,
  auditLogRepository,
  eventRegistrationRepository
);

export const getEventByIdUseCase = new GetEventByIdUseCase(eventRepository);
export const getEventsByKitchenUseCase = new GetEventsByKitchenUseCase(
  eventRepository
);

export const registerToEventUseCase = new RegisterToEventUseCase(
  eventRepository,
  eventRegistrationRepository,
  authService
);
export const unregisterFromEventUseCase = new UnregisterFromEventUseCase(
  eventRegistrationRepository,
  authService
);
export const getRegistrationsByEventUseCase =
  new GetRegistrationsByEventUseCase(
    eventRepository,
    eventRegistrationRepository,
    authService,
    kitchenService
  );

export const getUserRegistrationsUseCase = new GetUserRegistrationsUseCase(
  eventRegistrationRepository,
  authService,
  eventRepository 
);

export const subscribeToKitchenUseCase = new SubscribeToKitchenEventsUseCase(
  eventSubscriptionRepository,
  authService
);
export const unsubscribeFromKitchenUseCase =
  new UnsubscribeFromKitchenEventsUseCase(
    eventSubscriptionRepository,
    authService
  );
export const getKitchenSubscriptionsUseCase =
  new GetKitchenSubscriptionsUseCase(eventSubscriptionRepository);

export const createEventController = new CreateEventController(createEventUseCase);
export const updateEventController = new UpdateEventController(updateEventUseCase);
export const deleteEventController = new DeleteEventController(deleteEventUseCase);
export const getEventByIdController = new GetEventByIdController(getEventByIdUseCase);
export const getEventsByKitchenController = new GetEventsByKitchenController(getEventsByKitchenUseCase);
export const registerToEventController = new RegisterToEventController(registerToEventUseCase);
export const unregisterFromEventController = new UnregisterFromEventController(unregisterFromEventUseCase);
export const getRegistrationsByEventController = new GetRegistrationsByEventController(getRegistrationsByEventUseCase);

export const getUserRegistrationsController = new GetUserRegistrationsController(getUserRegistrationsUseCase);

export const subscribeToKitchenController = new SubscribeToKitchenController(subscribeToKitchenUseCase);
export const unsubscribeFromKitchenController = new UnsubscribeFromKitchenController(unsubscribeFromKitchenUseCase);
export const getKitchenSubscriptionsController = new GetKitchenSubscriptionsController(getKitchenSubscriptionsUseCase);