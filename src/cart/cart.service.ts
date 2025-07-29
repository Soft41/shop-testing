import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from '../entity/cart.entity';
import { ProductEntity } from '../entity/product.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import {
  getObjectPagination,
  toPaginatedResponse,
} from '../common/pagination.helper';
import { getCartSummary } from '../common/summary.helper';
import { PaginatedProductResponseDto } from '../product/dto/response/product.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  async addToCart(data: AddToCartDto): Promise<boolean> {
    const { userId, productId, quantity } = data;

    const user = await this.userService.findByIdOrThrow(userId);
    const product = await this.productService.findByIdOrThrow(productId);

    let cartItem = await this.cartRepository.findOne({
      where: { user: { id: userId }, product: { id: productId } },
      relations: ['user', 'product'],
    });

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = this.cartRepository.create({
        user,
        product,
        quantity,
      });
    }

    await this.cartRepository.save(cartItem);
    return true;
  }

  async updateCartItem(dto: UpdateCartDto): Promise<CartEntity> {
    const { userId, productId, quantity } = dto;

    const cartItem = await this.cartRepository.findOne({
      where: { user: { id: userId }, product: { id: productId } },
      relations: ['user', 'product'],
    });

    if (!cartItem) {
      throw new NotFoundException(
        `Cart item not found for user ${userId} and product ${productId}`,
      );
    }

    cartItem.quantity = quantity;
    return await this.cartRepository.save(cartItem);
  }

  async removeFromCart(userId: number, productId: number): Promise<void> {
    const cartItem = await this.cartRepository.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });

    if (!cartItem) {
      throw new NotFoundException(
        `Cart item not found for user ${userId} and product ${productId}`,
      );
    }

    await this.cartRepository.remove(cartItem);
  }

  async getCart(
    userId: number,
    paginationDto: PaginationDto,
  ): Promise<PaginatedProductResponseDto> {
    const { page, limit } = paginationDto;

    const { skip, take } = getObjectPagination(paginationDto);

    const [items, totalItems] = await this.cartRepository.findAndCount({
      where: { user: { id: userId } },
      relations: ['product'],
      skip,
      take,
      order: { id: 'ASC' },
    });

    const data = items.map((item) => getCartSummary(item));

    return toPaginatedResponse(data, totalItems, page, limit);
  }
}
