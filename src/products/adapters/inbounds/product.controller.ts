import { Transactional } from '@nestjs-cls/transactional';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StrictBuilder } from 'builder-pattern';
import type { IProduct } from 'src/products/applications/domains/product';
import { CreateProductCommand } from 'src/products/applications/ports/product.repository';
import { CreateProductUseCase } from 'src/products/applications/usecases/createProduct.usecase';
import { GetAllProductsUseCase } from 'src/products/applications/usecases/getAllProducts.usecase';
import { CreateProductDto } from './dto/createProduct.dto';

// @UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully created.',
  })
  @Post()
  @Transactional()
  create(@Body() createProductDto: CreateProductDto): Promise<IProduct> {
    const command = StrictBuilder<CreateProductCommand>()
      .name(createProductDto.name)
      .price(createProductDto.price)
      .image(createProductDto.image)
      .description(createProductDto.description)
      .build();
    return this.createProductUseCase.execute(command);
  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'The products have been successfully retrieved.',
  })
  @Get()
  getAll(): Promise<IProduct[]> {
    return this.getAllProductsUseCase.execute();
  }
}
