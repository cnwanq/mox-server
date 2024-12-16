import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LocalStraggy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { WinstonLogger } from 'nest-winston';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService, JwtService, LocalStraggy, JwtStrategy, WinstonLogger],
})
export class AuthModule {}
