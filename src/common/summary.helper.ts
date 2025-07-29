import { UserResponseDto } from '../user/dto/response/user';
import { UserEntity } from '../entity/user.entity';

export function getUserSummary(user: UserEntity): UserResponseDto {
  return {
    id: user.id,
    email: user.email,
  };
}
