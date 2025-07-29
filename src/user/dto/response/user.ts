import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponse } from '../../../common/dto/pagination.dto';

export class UserResponseDto {
  @ApiProperty({ example: 1, description: 'Unique identifier of the user' })
  id: number;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address of the user',
  })
  email: string;
}

export class PaginatedUserResponseDto {
  @ApiProperty({ type: PaginatedResponse<UserResponseDto> })
  data: UserResponseDto[];
}
