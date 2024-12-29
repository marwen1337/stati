import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ResultStatus } from './resultStatus.enum'
import { MonitorEntity } from '../../monitor/model/monitor.entity'

@Entity('result')
export class ResultEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ type: 'simple-enum', enum: ResultStatus })
  status: ResultStatus

  @Column({ type: 'simple-json' })
  result: object

  @ManyToOne(() => MonitorEntity, (monitor) => monitor.results)
  monitor: MonitorEntity

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date
}
