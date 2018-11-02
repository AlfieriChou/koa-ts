import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Card {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  code: string

  @Column()
  price: number

  @Column({ type: 'boolean', default: () => 'false' })
  is_use: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: string

  @Column({ type: 'time', default: () => '' })
  deleted_at: string
}