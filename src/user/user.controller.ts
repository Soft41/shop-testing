import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { PaginatedUserResponseDto, UserResponseDto } from './dto/response/user';
import { ApiResponse } from '@nestjs/swagger';
import { getUserSummary } from '../common/summary.helper';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({ status: 201, type: UserResponseDto })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userService.create(createUserDto);
    return getUserSummary(user);
  }

  @Get(':id')
  @ApiResponse({ status: 201, type: UserResponseDto })
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    const user = await this.userService.findByIdOrThrow(id);
    return getUserSummary(user);
  }
}
