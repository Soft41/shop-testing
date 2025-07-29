import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderEntity } from '../entity/order.entity';
import { OrderItemEntity } from '../entity/order-items.entity';
import { CartEntity } from '../entity/cart.entity';
import { ProductEntity } from '../entity/product.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderItemEntity,
      CartEntity,
      ProductEntity,
    ]),
    UserModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
