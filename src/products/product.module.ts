import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './adapters/inbounds/product.controller';
import { ProductMongoRepository } from './adapters/outbounds/product.mongo.repository';
import { ProductSchema, productsCollectionName } from './adapters/outbounds/product.schema';
import { productRepositoryToken } from './applications/ports/product.repository';
import { CreateProductUseCase } from './applications/usecases/createProduct.usecase';
import { GetAllProductsUseCase } from './applications/usecases/getAllProducts.usecase';

@Module({
  imports: [MongooseModule.forFeature([{ name: productsCollectionName, schema: ProductSchema }])],
  controllers: [ProductController],
  providers: [
    {
      provide: productRepositoryToken,
      useClass: ProductMongoRepository,
    },
    CreateProductUseCase,
    GetAllProductsUseCase,
  ],
})
export class ProductModule {}
