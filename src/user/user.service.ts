import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/response/user';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findById(id: number): Promise<UserResponseDto | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async findByIdOrThrow(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserResponseDto | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async findByEmailOrThrow(email: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto): Promise<UserResponseDto> {
    const user = this.userRepository.create({
      email: data.email,
      password: data.password,
    });

    return await this.userRepository.save(user);
  }
}
