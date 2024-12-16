import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

import JwtConstants from './common/constants/jwt';

import { ConfigModule } from '@nestjs/config';

const NODE_ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal:true,
        envFilePath: NODE_ENV === 'development'? '.env.development' : '.env.production',
    }),
    UsersModule, 
    AuthModule,
    JwtModule.register({
      global: true,
      secret: JwtConstants.secret,
      signOptions:{
        expiresIn: JwtConstants.expiresIn,
      },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
