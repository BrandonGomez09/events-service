import "reflect-metadata";
import { DataSource } from "typeorm";
import { DatabaseConfig } from "./database.config";
import { EventSchema } from "../database/schemas/event.schema";
import { EventRegistrationSchema } from "../database/schemas/event-registration.schema";
import { EventSubscriptionSchema } from "../database/schemas/event-subscription.schema";
import { AuditLogSchema } from "../database/schemas/audit-log.schema";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DatabaseConfig.host,
  port: DatabaseConfig.port,
  username: DatabaseConfig.username,
  password: DatabaseConfig.password,
  database: DatabaseConfig.database,
  synchronize: true,
  logging: false,

  //ssl: {
  //  rejectUnauthorized: false
  //},

  entities: [
    EventSchema,
    EventRegistrationSchema,
    EventSubscriptionSchema,
    AuditLogSchema,
  ],

  migrations: ["src/database/migrations/*.ts"],
});

