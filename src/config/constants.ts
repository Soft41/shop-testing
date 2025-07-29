import { plainToInstance, Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

export class EnvConfig {
  @IsNotEmpty()
  @IsString()
  POSTGRES_USER: string;

  @IsNotEmpty()
  @IsString()
  POSTGRES_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  POSTGRES_DB: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  POSTGRES_DB_PORT: number;

  @IsNotEmpty()
  @IsString()
  POSTGRES_DATA: string;

  @IsNotEmpty()
  @IsString()
  POSTGRES_HOST: string;
}

export function validateEnv(config: Record<string, unknown>): EnvConfig {
  const validated = plainToInstance(EnvConfig, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validated, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    console.error('Invalid environment variables:', errors);
    throw new Error('Invalid environment variables');
  }

  return validated;
}
