import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'iPhone 15 Pro',
    description: 'Name of the product',
    maxLength: 50,
  })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(50, { message: 'Name cannot exceed 50 characters' })
  name: string;

  @ApiProperty({
    example: 'Latest Apple iPhone with advanced features',
    description: 'Detailed description of the product',
    required: false,
  })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 999.99,
    description: 'Price of the product',
  })
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be greater than or equal to 0' })
  price: number;

  @ApiProperty({
    example: 100,
    description: 'Quantity of the product in stock',
    required: false,
    default: 0,
  })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(0, { message: 'Quantity must be greater than or equal to 0' })
  @IsOptional()
  quantity?: number;

  @ApiProperty({
    example: true,
    description: 'Indicates if the product is available for sale',
    required: false,
    default: true,
  })
  @IsBoolean({ message: 'isAvailable must be a boolean value' })
  @IsOptional()
  isAvailable?: boolean;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'URL of the product image',
    required: false,
  })
  @IsString({ message: 'Image URL must be a string' })
  @IsOptional()
  imageUrl?: string;
}
