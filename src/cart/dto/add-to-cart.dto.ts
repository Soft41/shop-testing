import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the user',
  })
  @IsInt({ message: 'User ID must be a number' })
  userId: number;

  @ApiProperty({
    example: 2,
    description: 'Unique identifier of the product',
  })
  @IsInt({ message: 'Product ID must be a number' })
  productId: number;

  @ApiProperty({
    example: 2,
    description: 'Quantity of the product to add to cart',
    minimum: 1,
  })
  @IsInt({ message: 'Quantity must be an integer' })
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}
