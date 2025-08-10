import { Module } from '@nestjs/common';
import { ProductController } from './adapters/inbounds/product.controller';
import { ProductPrismaRepository } from './adapters/outbounds/product.prisma.repository';
import { productRepositoryToken } from './applications/ports/product.repository';
// import { CreateProductUseCase } from './applications/usecases/createProduct.usecase';
import { CreateProductUseCase } from './applications/usecases/createProduct.usecase';
import { GetAllProductsUseCase } from './applications/usecases/getAllProducts.usecase';

@Module({
  controllers: [ProductController],
  providers: [
    {
      provide: productRepositoryToken,
      useClass: ProductPrismaRepository,
    },
    CreateProductUseCase,
    GetAllProductsUseCase,
  ],
})
export class ProductModule {}
