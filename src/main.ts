import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { configService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: function (origin, callback) {
      if (configService.getAllowedDomains().indexOf('*') !== -1) {
         callback(null, true);
      } else if (!origin || configService.getAllowedDomains().indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS  ${origin}`));
      }
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.getPort() ?? 3000);
}
bootstrap();
