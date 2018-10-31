import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Post {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column('text')
  text: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at:string

}