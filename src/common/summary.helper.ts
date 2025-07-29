import { UserResponseDto } from '../user/dto/response/user';
import { UserEntity } from '../entity/user.entity';
import { ProductEntity } from '../entity/product.entity';
import { ProductResponseDto } from '../product/dto/response/product.dto';

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
