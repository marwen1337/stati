import { SqliteDatasourceOptions } from '../src/app.datasource'
import { DataSource } from 'typeorm'

const dataSource = new DataSource(SqliteDatasourceOptions)
export default dataSource
