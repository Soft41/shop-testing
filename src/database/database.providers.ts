import { DataSource } from 'typeorm';
import { AppConfigService } from '../config/config.service';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [AppConfigService], // Внедряем AppConfigService
    useFactory: async (configService: AppConfigService) => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_DB_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
