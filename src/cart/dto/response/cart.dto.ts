import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from '../../../product/dto/response/product.dto';

export class CartProductResponseDto extends ProductResponseDto {
  @ApiProperty({
    example: 3,
    description: 'Quantity of the product in the cart',
  })
  declare quantity: number;
}

export class PaginatedCartProductResponseDto {
  @ApiProperty({ type: [CartProductResponseDto] })
  data: CartProductResponseDto[];
}
