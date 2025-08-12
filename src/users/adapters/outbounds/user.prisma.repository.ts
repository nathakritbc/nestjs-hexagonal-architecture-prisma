import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';
import { Builder } from 'builder-pattern';
import { UserRepository } from 'src/users/applications/ports/user.repository';
import {
  IUser,
  User,
  UserCreatedAt,
  UserEmail,
  UserId,
  UserPassword,
  UserUpdatedAt,
  UserUsername,
} from '../../applications/domains/user.domain';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: TransactionHost<TransactionalAdapterPrisma>) {}

  async create(user: IUser): Promise<IUser> {
    const userCreated = await this.prisma.tx.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });
    return UserPrismaRepository.toDomain(userCreated);
  }
  async getByUsername(username: string): Promise<IUser | undefined> {
    const user = await this.prisma.tx.user.findUnique({
      where: {
        username,
      },
    });
    return user ? UserPrismaRepository.toDomain(user) : undefined;
  }

  static toDomain(user: PrismaUser): IUser {
    return Builder(User)
      .uuid(user.uuid as UserId)
      .username(user.username as UserUsername)
      .email(user.email as UserEmail)
      .password(user.password as UserPassword)
      .createdAt(user.createdAt as UserCreatedAt)
      .updateAt(user.updatedAt as UserUpdatedAt)
      .build();
  }
}
