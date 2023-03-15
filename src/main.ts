import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';

async function bootstrap() {
  const mongod = await MongoMemoryServer.create({
    instance: {
      port: 54321,
    },
  });
  console.log(`MongoDB is running on: ${mongod.getUri()}`);

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
