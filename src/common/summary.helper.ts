import { UserResponseDto } from '../user/dto/response/user';
import { UserEntity } from '../entity/user.entity';
import { ProductEntity } from '../entity/product.entity';
import { ProductResponseDto } from '../product/dto/response/product.dto';
import { CartEntity } from '../entity/cart.entity';
import { CartProductResponseDto } from '../cart/dto/response/cart.dto';

export function getUserSummary(user: UserEntity): UserResponseDto {
  return {
    id: user.id,
    email: user.email,
  };
}

export function getProductSummary(product: ProductEntity): ProductResponseDto {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    quantity: product.quantity,
    isAvailable: product.isAvailable,
    imageUrl: product.imageUrl,
  };
}

export function getCartSummary(cart: CartEntity): CartProductResponseDto {
  return {
    id: cart.product.id!,
    name: cart.product.name,
    description: cart.product.description,
    price: Number(cart.product.price),
    quantity: cart.quantity,
    isAvailable: cart.product.isAvailable,
    imageUrl: cart.product.imageUrl,
  };
}
