import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { PaginatedUserResponseDto, UserResponseDto } from './dto/response/user';
import { ApiResponse } from '@nestjs/swagger';
import { getUserSummary } from '../common/summary.helper';
import { PaginationDto } from '../common/dto/pagination.dto';

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

  @Get()
  @ApiResponse({ status: 200, type: PaginatedUserResponseDto })
  async findAll(
    @Query() pagination: PaginationDto,
  ): Promise<PaginatedUserResponseDto> {
    return this.userService.findAll(pagination);
  }
}
