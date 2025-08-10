import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Builder } from 'builder-pattern';
import { ClsModuleOptions } from 'nestjs-cls';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

const imports = [PrismaModule];
const adapter = new TransactionalAdapterPrisma({
  prismaInjectionToken: PrismaService,
});

const plugins = [
  new ClsPluginTransactional({
    imports: imports,
    adapter: adapter,
  }),
];

const middleware = {
  mount: true,
  // setup: (cls, req) => {
  //   cls.set('reqHeaders', req.headers);
  //   cls.set('sessionId', req['sessionId']);
  // },
};

export const prismaRootConfig = Builder<ClsModuleOptions>()
  .plugins(plugins)
  .global(true)
  .middleware(middleware)
  .build();
