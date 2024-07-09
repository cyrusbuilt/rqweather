import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Configuration from './configuration';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerService } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '../package.json';
import helmet from 'helmet';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

async function gracefulShutdown(logger: LoggerService) {
  logger.log('Terminate signal caught or uncaught exception. Shutting down...');

  // TOOD any additional tear-down.

  process.exit(1);
}

async function bootstrap() {
  const port = Configuration.shared.serverPort || 8080;
  const isProduction = process.env.NODE_ENV === 'production';
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  });
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER) as LoggerService;

  // Setup local icon cache
  const iconCache = join(__dirname, '..', 'icons');
  try {
    if (!existsSync(iconCache)) {
      mkdirSync(iconCache);
    }

    Configuration.shared.setIconCache(iconCache);
  } catch (e) {
    logger.error(e);
  }

  const config = new DocumentBuilder()
    .setTitle('RQWeather API')
    .setDescription('Provides an API for interacting with RQWeather data')
    .setVersion(version)
    .addTag('rqweather')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, document);

  app.useLogger(logger);
  app.enableCors();
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: { 'default-src': ['*'] },
      },
    }),
  );
  app.useStaticAssets(iconCache, {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setHeaders: (res, _path, _stat) => {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Content-Type', 'image/png');
    },
    prefix: '/icons/',
  });

  await app.listen(port, () => {
    process.on('SIGTERM', () => gracefulShutdown(logger));
    if (isProduction) {
      process.on('uncaughtException', () => gracefulShutdown(logger));
    }

    logger.log(`Server listening on port ${port}`);
  });
}

bootstrap();
