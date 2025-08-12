import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClsModule } from 'nestjs-cls';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import { configModule } from './configs/app.config';
import { httpConfig } from './configs/http.config';
import { loggerConfig } from './configs/logger.config';
import { prismaRootConfig } from './configs/prisma.config';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ProductModule } from './products/product.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ClsModule.forRoot(prismaRootConfig),
    ConfigModule.forRoot(configModule),
    HttpModule.register(httpConfig),
    LoggerModule.forRoot(loggerConfig),
    AuthModule,
    PrismaModule,
    ProductModule,
    UserModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
