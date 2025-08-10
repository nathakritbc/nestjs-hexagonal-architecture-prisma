import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

import { CreateProductCommand } from 'src/products/applications/ports/product.repository';

export class CreateProductDto implements CreateProductCommand {
  @ApiProperty({
    type: String,
    example: 'John Doe',
    description: 'The name of the product in multiple languages',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Number,
    example: 100.75,
    description: 'The price of the product',
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    type: String,
    example: 'https://example.com/avatar.jpg',
    description: 'The image of the product',
  })
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    type: String,
    example: 'This is a product description',
    description: 'The description of the product',
  })
  @IsOptional()
  description: string;
}
