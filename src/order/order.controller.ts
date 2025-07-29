import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderResponseDto } from './dto/response/create-order.dto';
import { ParseIntPipe } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { UpdateOrderResponseDto } from './dto/response/update-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order.dto';
import { OrderEntity } from '../entity/order.entity';
import {
  OrderItemResponseDto,
  OrderResponseDto,
} from './dto/response/order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post(':userId')
  @ApiResponse({ status: 201, type: CreateOrderResponseDto })
  async createOrder(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<CreateOrderResponseDto> {
    const orderId = await this.orderService.createOrder(userId);
    return { message: 'Order created successfully', orderId };
  }

  @Patch(':orderId')
  @ApiResponse({ status: 200, type: UpdateOrderResponseDto })
  @ApiBody({ type: UpdateOrderStatusDto })
  async updateStatus(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() updateDto: UpdateOrderStatusDto,
  ): Promise<UpdateOrderResponseDto> {
    const result = await this.orderService.updateStatus(
      orderId,
      updateDto.status,
    );
    return {
      message: 'Order status changed successfully',
      success: result,
    };
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get orders by user ID' })
  @ApiResponse({
    status: 200,
    type: [OrderItemResponseDto],
  })
  async getOrdersByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<OrderResponseDto[]> {
    return this.orderService.getOrdersByUserId(userId);
  }
}
