import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import EncryptionUtils from 'src/utils/encryption';
import { PrismaService } from 'src/common/prisma/prisma.service';
import JwtConstants from 'src/common/constants/jwt';



@Injectable()
export class AuthService {

  constructor(private usersService: UsersService, private jwtService: JwtService, private prisma: PrismaService) {}

  async loginWithPassword(username: string, password: string) {

    const user = await this.validateUser(username, password);
    return this.login(user);
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findUserByName(username);
    if (!user) {
      throw new HttpException( 'username is not exist', 400);
    }

    let checkPwd  = EncryptionUtils.hashPassword(password, user.salt);
    if (checkPwd !== user.password) {
      throw new HttpException( 'password is not correct', 400);
    }
    return user;
  }

  async login(user: any) {
    // 验证成功，返回token
    let payload = user.payload();
    let token = this.jwtService.sign(payload,{secret:JwtConstants.secret, expiresIn: JwtConstants.expiresIn});

    // 生成refresh_token
    let refresh_token = this.jwtService.sign(payload, {secret:JwtConstants.secret, expiresIn: JwtConstants.refreshExpiresIn});

    // 保存refresh_token到数据库
    await this.prisma.auth.create({
      data: {
        userId: user.id,
        token: token,
        refreshToken: refresh_token,
      }
    });


    return {
      ...payload,
      access_token: token,
      refresh_token: refresh_token
    }
  }

}
