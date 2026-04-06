import "./bootstrap-env";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 4000;
  app.enableCors({
    origin:
      process.env.CORS_ORIGIN?.split(",").map((o) => o.trim()) ?? [
        "http://localhost:3000",
        "http://localhost:3001",
      ],
    credentials: true,
  });
  await app.listen(port);
  console.log(`Novitas API listening on http://localhost:${port}`);
}

bootstrap();
