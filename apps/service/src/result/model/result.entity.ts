import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { MonitorEntity } from '../../monitor/model/monitor.entity'
import { MonitorStatus } from '@app/shared/model/monitor-status.enum'
import { randomUUID } from 'node:crypto'

@Entity('result')
export class ResultEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => MonitorEntity, (monitor) => monitor.results, {
    onDelete: 'CASCADE'
  })
  monitor: MonitorEntity

  @Column({ type: 'simple-enum', enum: MonitorStatus })
  status: MonitorStatus

  @Column({ type: 'simple-json' })
  metrics: object

  @CreateDateColumn()
  createdAt: Date

  static getEmpty() {
    const result = new ResultEntity()
    result.id = randomUUID().toString()
    result.status = MonitorStatus.DOWN
    result.createdAt = new Date()
    return result
  }
}
