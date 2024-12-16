import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as csurf from 'csurf';

import { corsOptionsDelegate } from './utils/cors.delegate';
import { AuthGuard } from './common/guards/auth.guard';
import { HttpExceptionFilter } from './common/filters/http.exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { logger } from './common/logger/winston.config';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);


  // 开启跨域支持
  app.enableCors(corsOptionsDelegate);
  // 开启CSRF保护
  // app.use(csurf());

  // // 开启日志
  // app.useLogger(logger)

  // 开启全局拦截器 
  app.useGlobalInterceptors(new TransformInterceptor());

  // 设置全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 设置全局守卫
  app.useGlobalGuards(new AuthGuard());

  // 启动服务
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
