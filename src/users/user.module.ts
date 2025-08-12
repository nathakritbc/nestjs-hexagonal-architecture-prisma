import { Module } from '@nestjs/common';
import { UserController } from './adapters/inbounds/user.controller';
import { UserPrismaRepository } from './adapters/outbounds/user.prisma.repository';
import { userRepositoryToken } from './applications/ports/user.repository';
import { CreateUserUseCase } from './applications/usecases/createUser.usecase';
import { GetUserByUsernameUseCase } from './applications/usecases/getUserByUsername.usecase';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetUserByUsernameUseCase,
    {
      provide: userRepositoryToken,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UserModule {}
