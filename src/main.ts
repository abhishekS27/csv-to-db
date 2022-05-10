import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DbConection } from './shared/connection/dbConnection';

async function bootstrap() {
  DbConection.connect();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
