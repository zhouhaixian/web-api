import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes';
import { version } from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env['NODE_ENV'] !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Web API')
      .setDescription('Web API')
      .setVersion(version)
      .setLicense('GPL-3.0', 'https://www.gnu.org/licenses/gpl-3.0.html')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env['PORT'] || 3001);
}
bootstrap();
