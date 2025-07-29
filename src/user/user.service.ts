import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from '../entity/user.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginatedUserResponseDto } from './dto/response/user';
import {
  getObjectPagination,
  toPaginatedResponse,
} from '../common/pagination.helper';
import { getUserSummary } from '../common/summary.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findById(id: number): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async findByIdOrThrow(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async findByEmailOrThrow(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedUserResponseDto> {
    const { page = 1, limit = 20 } = paginationDto;

    const { skip, take } = getObjectPagination(paginationDto);

    const [users, totalItems] = await this.userRepository.findAndCount({
      skip,
      take,
      order: { id: 'ASC' },
    });

    const data = users.map((user) => getUserSummary(user));

    return toPaginatedResponse(users, totalItems, page, limit);
  }

  async create(data: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.findByEmail(data.email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const user = this.userRepository.create({
      email: data.email,
      password: data.password,
    });

    return await this.userRepository.save(user);
  }
}
