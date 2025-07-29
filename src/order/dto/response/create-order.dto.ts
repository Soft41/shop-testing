import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderResponseDto {
  @ApiProperty({
    example: 'Order created successfully',
    description: 'Message confirming order creation',
  })
  message: string;

  @ApiProperty({
    example: 101,
    description: 'Unique identifier of the created order',
  })
  orderId: number;
}
