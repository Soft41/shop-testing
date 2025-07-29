import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartEntity } from '../entity/cart.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity]), UserModule, ProductModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
