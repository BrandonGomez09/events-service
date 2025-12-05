import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { AppDataSource } from "./config/data-source";
import { RabbitMQ } from "./config/rabbitmq";

const PORT = process.env.PORT;

async function start() {
  try {
    console.log("🔄 Initializing Event Service...");
    await AppDataSource.initialize();
    console.log("📦 Database connected");

    RabbitMQ.connect().then(() =>
      console.log("🐇 RabbitMQ connected")
    );

    app.listen(PORT, () => {
      console.log("🚀═════════════════════════════════════🚀");
      console.log(`   Events Service running on port ${PORT}`);
      console.log("🚀═════════════════════════════════════🚀");
    });

  } catch (error) {
    console.error("❌ Failed to start Event Service:", error);
    process.exit(1);
  }
}

start();
