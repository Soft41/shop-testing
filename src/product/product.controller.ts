import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from '../entity/product.entity';
import { getProductSummary } from '../common/summary.helper';
import {
  PaginatedProductResponseDto,
  ProductResponseDto,
} from './dto/response/product.dto';
import { GetProductsDto } from './dto/find-products.dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiResponse({
    status: 201,
    type: ProductEntity,
  })
  async createProduct(
    @Body() dto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.productService.create(dto);
    return this.productService.create(product);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: ProductResponseDto })
  async getProductById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductResponseDto> {
    const product = await this.productService.findByIdOrThrow(id);
    return getProductSummary(product);
  }

  @Get()
  @ApiResponse({ status: 200, type: PaginatedProductResponseDto })
  async findAll(@Query() filter: GetProductsDto) {
    return this.productService.findAll(filter);
  }
}
