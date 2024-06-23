import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import BadRequest from './exceptions/bad-request.exception';
import HttpExceptionFilter from './exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.reduce((acc, error) => {
          if (error.constraints) {
            acc.push(...Object.values(error.constraints));
          }
          return acc;
        }, []);
        return new BadRequest(messages);
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}

bootstrap();
