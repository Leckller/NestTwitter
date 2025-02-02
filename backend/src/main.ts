import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import SeedService from './DB/Seeds/Seed.Service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: "*" })

  // Configuração para validar com DTOs
  app.useGlobalPipes(new ValidationPipe());

  // Swagger Config
  const config = new DocumentBuilder()
    .setTitle('Twitter Example')
    .setDescription('Api baseada no Twitter')
    .setVersion('2.3')
    .addTag('Funny')
    .build();

  // Aqui você chama o serviço de seed
  const seedService = app.get(SeedService);
  await seedService.seeds();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT

  await app.listen(port || 3000);

  console.log("\nNest Backend:")
  console.log("\x1b[36m%s\x1b[0m", `http://localhost:${port || 3000}`)
  console.log("\nSwagger:")
  console.log("\x1b[36m%s\x1b[0m", `http://localhost:${port || 3000}/api`)

}
bootstrap();
