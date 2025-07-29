import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  Get,
  Query,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiResponse } from '@nestjs/swagger';
import { PaginatedUserResponseDto } from '../user/dto/response/user';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginatedProductResponseDto } from '../product/dto/response/product.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(@Body() data: AddToCartDto): Promise<boolean> {
    await this.cartService.addToCart(data);
    return true;
  }

  @Patch()
  async updateCartItem(@Body() data: UpdateCartDto): Promise<boolean> {
    await this.cartService.updateCartItem(data);
    return true;
  }

  @Delete(':userId/:productId')
  async removeFromCart(
    @Param('userId', new ParseIntPipe()) userId: number,
    @Param('productId', new ParseIntPipe()) productId: number,
  ): Promise<boolean> {
    await this.cartService.removeFromCart(userId, productId);
    return true;
  }

  @Get(':userId')
  @ApiResponse({ status: 200, type: PaginatedUserResponseDto })
  async getCart(
    @Query() pagination: PaginationDto,
    @Param('userId', new ParseIntPipe()) userId: number,
  ): Promise<PaginatedProductResponseDto> {
    return await this.cartService.getCart(userId, pagination);
  }
}
