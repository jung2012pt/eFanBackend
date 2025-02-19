import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for all origins
  app.enableCors({
    origin: '*', // This will allow all domains (use cautiously in production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  });

  await app.listen(3000);
}

bootstrap();
