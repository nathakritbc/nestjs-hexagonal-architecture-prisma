import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { Builder } from 'builder-pattern';
import {
  IProduct,
  ProductCreatedAt,
  ProductDescription,
  ProductDomain,
  ProductId,
  ProductImage,
  ProductName,
  ProductPrice,
  ProductUpdatedAt,
} from 'src/products/applications/domains/product.domain';
import { ProductRepository } from 'src/products/applications/ports/product.repository';
import { Status } from 'src/types/utility.type';
// import { ProductMongoSchema, productsCollectionName } from './product.schema';
@Injectable()
export class ProductPrismaRepository implements ProductRepository {
  constructor(private readonly prisma: TransactionHost<TransactionalAdapterPrisma>) {}

  async create(product: IProduct): Promise<IProduct> {
    const resultCreated = await this.prisma.tx.product.create({
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

  async deleteById(id: ProductId): Promise<void> {
    await this.prisma.tx.product.delete({
      where: {
        uuid: id,
      },
    });
  }

  async getAll(): Promise<IProduct[]> {
    const products = await this.prisma.tx.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return products ? products.map(ProductPrismaRepository.toDomain) : [];
  }

  async getById(id: ProductId): Promise<IProduct | undefined> {
    const product = await this.prisma.tx.product.findUnique({
      where: {
        uuid: id,
      },
    });
    return product ? ProductPrismaRepository.toDomain(product) : undefined;
  }

  async updateById(id: ProductId, product: Partial<IProduct>): Promise<IProduct> {
    const updatedProduct = await this.prisma.tx.product.update({
      where: {
        uuid: id,
      },
      data: product,
    });
    return ProductPrismaRepository.toDomain(updatedProduct);
  }

  public static toDomain(productEntity: Product): IProduct {
    return Builder(ProductDomain)
      .uuid(productEntity.uuid as ProductId)
      .name(productEntity.name as ProductName)
      .price(productEntity.price as ProductPrice)
      .description(productEntity.description as ProductDescription)
      .image(productEntity.image as ProductImage)
      .status(productEntity.status as Status)
      .createdAt(productEntity.createdAt as ProductCreatedAt)
      .updatedAt(productEntity.updatedAt as ProductUpdatedAt)
      .build();
  }
}
