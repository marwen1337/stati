import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { MonitorEntity } from '../../monitor/model/monitor.entity'
import { MonitorStatus } from '../../../../agent/src/monitoring/monitors/monitor.interface'

@Entity('result')
export class ResultEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => MonitorEntity, (monitor) => monitor.results)
  monitor: MonitorEntity

  @Column({ type: 'simple-enum', enum: MonitorStatus })
  status: MonitorStatus

  @Column({ type: 'simple-json' })
  metrics: object

  @CreateDateColumn()
  createdAt: Date
}
