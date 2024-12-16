import { Injectable } from '@nestjs/common';

import { User } from './entities/user.entity';
import { Prisma } from '@prisma/client';
import EncryptionUtils from '../../utils/encryption';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService){}
  

  async create(data: CreateUserDto): Promise<User> {
    let salt = EncryptionUtils.generateSalt(16);
    let password = EncryptionUtils.hashPassword(data.password, salt);

    const result = await this.prisma.user.create({
      data: {
        username: data.username,
        password: password,
        salt: salt,
        email: data.email,
      }
    })
    let user = User.fromJson(result);
    return user;
  }

  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    const result = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    let user = User.fromJson(result);
    return user;
  }

  async findAll(): Promise<User[]> {
    const result = await this.prisma.user.findMany();
    return result.map((user) => User.fromJson(user));
  }

  async findUserById(id: number): Promise<User | null> {
    const result = await this.prisma.user.findUnique({
      where: { id: id },
    });
    let user = User.fromJson(result);
    return user;
  }

  async findUserByName(username: string): Promise<User | null> {
    const result = await this.prisma.user.findUnique({
      where: { username: username },
    });
    // console.log(result);
    let user = User.fromJson(result);
    return user;
  }

}
