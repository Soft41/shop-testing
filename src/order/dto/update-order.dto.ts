import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from './order.dto';

export class UpdateOrderStatusDto {
  @ApiProperty({ enum: OrderStatus, description: 'New status of the order' })
  @IsEnum(OrderStatus, { message: 'Status must be a valid OrderStatus value' })
  status: OrderStatus;
}
