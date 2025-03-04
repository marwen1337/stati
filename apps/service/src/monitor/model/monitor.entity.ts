import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { MonitorType } from './monitorType.enum'
import { AgentEntity } from '../../agent/model/agent.entity'
import { ResultEntity } from '../../result/model/result.entity'

@Entity('monitor')
export class MonitorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ default: '0 * * * * *' })
  cronSchedule: string

  @Column({ type: 'simple-enum', enum: MonitorType })
  type: MonitorType

  @Column({ type: 'simple-json' })
  configuration: object

  @ManyToOne(() => AgentEntity, (agent) => agent.monitors)
  agent: AgentEntity

  @OneToMany(() => ResultEntity, (result) => result.monitor)
  results: ResultEntity[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  toString() {
    return `${this.name} (${this.id})`
  }
}
