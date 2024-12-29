import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
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

  @Column({ type: 'simple-enum', enum: MonitorType })
  type: MonitorType

  @Column({ type: 'simple-json' })
  configuration: object

  @ManyToOne(() => AgentEntity, (agent) => agent.monitors)
  agent: AgentEntity

  @OneToMany(() => ResultEntity, (result) => result.monitor)
  results: ResultEntity[]

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date
}
