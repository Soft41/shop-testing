import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class UpdateCartDto {
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
    example: 3,
    description: 'New quantity of the product in the cart',
  })
  @IsInt()
  @Min(1)
  quantity: number;
}
