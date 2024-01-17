import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');

  app.use(bodyParser.json({ limit: '50mb' }));

  await app.listen(process.env.PORT ?? 8090, () => {
    console.log(`URL: http://localhost:${process.env.PORT}/api/health-check`);
  });
}
bootstrap();
