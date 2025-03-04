import { DataSourceOptions } from 'typeorm'
import { Init1741116752873 } from '../db/migrations/1741116752873-Init'

export const SqliteDatasourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: './data/database.sqlite',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [Init1741116752873]
}
