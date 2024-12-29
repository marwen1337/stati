import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
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

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date
}
