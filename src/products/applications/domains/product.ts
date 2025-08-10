import { Product } from '@prisma/client';
import { Brand, CreatedAt, UpdatedAt } from 'src/types/utility.type';

export type ProductId = Brand<string, 'ProductId'>;
export type ProductName = Brand<string, 'ProductName'>;
export type ProductPrice = Brand<number, 'ProductPrice'>;
export type ProductDescription = Brand<string, 'ProductDescription'>;
export type ProductImage = Brand<string, 'ProductImage'>;
export type ProductCreatedAt = Brand<CreatedAt, 'ProductCreatedAt'>;
export type ProductUpdatedAt = Brand<UpdatedAt, 'ProductUpdatedAt'>;

export interface IProduct extends Product {
  uuid: string;
  name: string;
  price: number;
  description: string | null;
  status: string;
  image: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export class ProductDomain implements IProduct {
  uuid: string;
  name: string;
  price: number;
  description: string | null;
  status: string;
  image: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
