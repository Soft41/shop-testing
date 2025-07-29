import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../entity/order.entity';
import { ProductEntity } from '../entity/product.entity';
import { UserService } from '../user/user.service';
import { CartEntity } from '../entity/cart.entity';
import { OrderItemEntity } from '../entity/order-items.entity';
import { OrderStatus } from './dto/order.dto';
import {
  OrderItemResponseDto,
  OrderResponseDto,
} from './dto/response/order.dto';
import { getOrderSummary } from '../common/summary.helper';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,

    private readonly userService: UserService,
  ) {}

  async createOrder(userId: number): Promise<number> {
    const user = await this.userService.findByIdOrThrow(userId);

    const cartItems = await this.cartRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });

    if (!cartItems.length) {
      throw new BadRequestException('Cart is empty');
    }

    const unavailableProducts = cartItems
      .filter((item) => !item.product.isAvailable)
      .map((item) => item.product.name);

    if (unavailableProducts.length) {
      throw new BadRequestException(
        `Products not available: ${unavailableProducts.join(', ')}`,
      );
    }

    let total = 0;
    const order = this.orderRepository.create({
      userId,
      status: OrderStatus.IN_PROCESS,
      totalAmount: 0,
    });

    const savedOrder = await this.orderRepository.save(order);

    const orderItems = cartItems.map((item) => {
      const price = Number(item.product.price);
      total += price * item.quantity;

      return this.orderItemRepository.create({
        orderId: savedOrder.id,
        productId: item.product.id,
        quantity: item.quantity,
        price,
      });
    });

    await this.orderItemRepository.save(orderItems);

    savedOrder.totalAmount = total;
    await this.orderRepository.save(savedOrder);

    await this.cartRepository.remove(cartItems);

    return savedOrder.id;
  }

  async updateStatus(orderId: number, status: OrderStatus): Promise<boolean> {
    const order = await this.orderRepository.findOneBy({ id: orderId });
    if (!order) throw new NotFoundException('Order not found');

    order.status = status;

    await this.orderRepository.save(order);
    return true;
  }

  async getOrdersByUserId(userId: number): Promise<OrderResponseDto[]> {
    const orders = await this.orderRepository.find({
      where: { userId },
      relations: ['orderItems', 'orderItems.product'],
      order: { createdAt: 'DESC' },
    });

    return orders.map(getOrderSummary);
  }
}
