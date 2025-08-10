import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { IProduct } from 'src/products/applications/domains/product';
import { ProductRepository } from 'src/products/applications/ports/product.repository';
// import { ProductMongoSchema, productsCollectionName } from './product.schema';
@Injectable()
export class ProductPrismaRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(product: IProduct): Promise<IProduct> {
    const resultCreated = await this.prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        status: product.status,
      },
    });

    return ProductPrismaRepository.toDomain(resultCreated);
  }

  // async deleteById(id: ProductId): Promise<void> {
  //   await this.productModel.deleteOne({ _id: id }).session(this.txHost.tx).lean().exec();
  // }

  async getAll(): Promise<IProduct[]> {
    const products = await this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return products ? products.map(ProductPrismaRepository.toDomain) : [];
  }

  // async getById(id: ProductId): Promise<IProduct | undefined> {
  //   const product = await this.productModel.findById(id).session(this.txHost.tx).lean().exec();
  //   return product ? ProductMongoRepository.toDomain(product) : undefined;
  // }

  // async updateById(id: ProductId, product: Partial<IProduct>): Promise<IProduct> {
  //   const updatedProduct = await this.productModel
  //     .findByIdAndUpdate(id, product, { new: true })
  //     .session(this.txHost.tx)
  //     .lean()
  //     .exec();
  //   return ProductMongoRepository.toDomain(updatedProduct!);
  // }

  public static toDomain(productEntity: Product): IProduct {
    return {
      uuid: productEntity.uuid,
      name: productEntity.name,
      price: productEntity.price,
      description: productEntity.description,
      image: productEntity.image,
      status: productEntity.status,
      createdAt: productEntity.createdAt,
      updatedAt: productEntity.updatedAt,
    };
  }
}
