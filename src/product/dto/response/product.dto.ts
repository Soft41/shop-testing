import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponse } from '../../../common/dto/pagination.dto';

export class ProductResponseDto {
  @ApiProperty({ example: 1, description: 'Unique identifier of the product' })
  id: number;

  @ApiProperty({ example: 'iPhone 15 Pro', description: 'Name of the product' })
  name: string;

  @ApiProperty({
    example: 'Latest model with advanced features',
    description: 'Product description',
    required: false,
  })
  description?: string;

  @ApiProperty({ example: 999.99, description: 'Price of the product' })
  price: number;

  @ApiProperty({ example: 10, description: 'Quantity available in stock' })
  quantity: number;

  @ApiProperty({
    example: true,
    description: 'Availability status of the product',
  })
  isAvailable: boolean;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'URL of product image',
    required: false,
  })
  imageUrl?: string;
}

export class PaginatedProductResponseDto {
  @ApiProperty({ type: PaginatedResponse<ProductResponseDto> })
  data: ProductResponseDto[];
}
