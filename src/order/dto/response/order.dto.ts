import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from '../../../product/dto/response/product.dto';
import { OrderStatus } from '../order.dto';

export class OrderItemResponseDto extends ProductResponseDto {
  @ApiProperty({
    example: 2,
    description: 'Quantity of the product in the order',
  })
  declare quantity: number;

  @ApiProperty({
    example: 199.99,
    description: 'Price of the product at the time of the order',
  })
  declare price: number;
}

export class OrderResponseDto {
  @ApiProperty({
    example: 101,
    description: 'Order ID',
  })
  id: number;

  @ApiProperty({
    enum: OrderStatus,
    description: 'Status of the order',
  })
  status: string;

  @ApiProperty({
    example: 399.98,
    description: 'Total amount for the order',
  })
  totalAmount: number;

  @ApiProperty({ type: [OrderItemResponseDto] })
  orderItems: OrderItemResponseDto[];

  @ApiProperty({
    example: '2025-07-29T13:00:00.000Z',
    description: 'Order creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-07-29T14:00:00.000Z',
    description: 'Order last update timestamp',
  })
  updatedAt: Date;
}
