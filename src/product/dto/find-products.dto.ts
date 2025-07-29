import {
  IsOptional,
  IsEnum,
  IsString,
  IsNumber,
  Min,
  IsBoolean,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Order } from '../../common/dto/order';

export enum ProductSortField {
  PRICE = 'price',
  NAME = 'name',
}

export class GetProductsDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isAvailable?: boolean;

  @IsOptional()
  @IsEnum(ProductSortField)
  orderBy?: ProductSortField = ProductSortField.PRICE;

  @IsOptional()
  @IsEnum(Order)
  sort?: Order = Order.ASC;
}
