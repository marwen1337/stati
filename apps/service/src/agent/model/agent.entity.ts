import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { MonitorEntity } from '../../monitor/model/monitor.entity'

@Entity('agent')
export class AgentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  hashedAccessKey: string

  @Column()
  lastSeen: Date

  @OneToMany(() => MonitorEntity, (monitor) => monitor.agent)
  monitors: MonitorEntity[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  toString() {
    return `${this.name} (${this.id})`
  }
}
