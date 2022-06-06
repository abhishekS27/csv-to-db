import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DbConection } from './shared/connection/dbConnection';

async function bootstrap() {
  DbConection.connect();
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
  // await app.listen(3000);
}
bootstrap();
