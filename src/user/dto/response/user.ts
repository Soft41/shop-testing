import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../../common/dto/pagination.dto';

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
  @ApiProperty({ type: PaginationDto })
  pagination: PaginationDto;

  @ApiProperty({ type: [UserResponseDto] })
  data: UserResponseDto[];
}
