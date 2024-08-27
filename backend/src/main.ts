import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not set in the environment variables");
  }
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Add this line

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
