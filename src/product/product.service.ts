import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto } from './dto/find-products.dto';
import { toPaginatedResponse } from '../common/pagination.helper';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findById(id: number): Promise<ProductEntity | null> {
    return await this.productRepository.findOneBy({ id });
  }

  async findByIdOrThrow(id: number): Promise<ProductEntity> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return user;
  }

  async findAll(filter: GetProductsDto) {
    const {
      page = 1,
      limit = 20,
      name,
      description,
      minPrice,
      maxPrice,
      isAvailable,
      orderBy,
      sort,
    } = filter;
    const skip = (page - 1) * limit;

    const query = this.productRepository.createQueryBuilder('product');

    if (name) {
      query.andWhere('product.name LIKE :name', { name: `%${name}%` });
    }

    if (description) {
      query.andWhere('product.description LIKE :description', {
        description: `%${description}%`,
      });
    }

    if (minPrice) {
      query.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice) {
      query.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    if (isAvailable) {
      query.andWhere('product.isAvailable = :isAvailable', { isAvailable });
    }

    query.orderBy(`product.${orderBy}`, sort);

    query.skip(skip).take(limit);

    const [data, totalItems] = await query.getManyAndCount();

    return toPaginatedResponse(data, totalItems, page, limit);
  }

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    const product = this.productRepository.create(dto);
    return await this.productRepository.save(product);
  }
}
