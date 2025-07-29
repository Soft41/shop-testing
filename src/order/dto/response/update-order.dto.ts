import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderResponseDto {
  @ApiProperty({
    example: 'Order status changed successfully',
    description: 'Message confirming order change status',
  })
  message: string;

  @ApiProperty({
    example: true,
    description: 'Order status changed successfully',
  })
  success: boolean;
}
