import { Injectable } from '@nestjs/common';
import { EnvConfig, validateEnv } from './constants';

@Injectable()
export class AppConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    this.envConfig = validateEnv(process.env);
  }

  get<T extends keyof EnvConfig>(key: T): EnvConfig[T] {
    return this.envConfig[key];
  }
}
