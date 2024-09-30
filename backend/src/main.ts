import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração para validar com DTOs
  app.useGlobalPipes(new ValidationPipe());

  // Swagger Config
  const config = new DocumentBuilder()
  .setTitle('Twitter Example')
  .setDescription('Api baseada no Twitter')
  .setVersion('2.3')
  .addTag('Funny')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  
  console.log("\nNest Backend:")
  console.log("\x1b[36m%s\x1b[0m", "http://localhost:3000")
  console.log("\nSwagger:")
  console.log("\x1b[36m%s\x1b[0m", "http://localhost:3000/api")
}
bootstrap();
