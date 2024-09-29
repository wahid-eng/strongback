import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService(app);
  const port = configService.get<number>('PORT', 8000);
  app.setGlobalPrefix('api');

  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Strongback')
      .setDescription('Simple project management APIs')
      .setVersion('1.0')
      .addBearerAuth()
      .build(),
  );
  SwaggerModule.setup('/', app, document);
  await app.listen(port, async () =>
    console.log('Application listening on', await app.getUrl()),
  );
}
bootstrap();
