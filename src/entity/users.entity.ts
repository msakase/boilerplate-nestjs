import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 512 })
  passwordHash: string;

  @CreateDateColumn()
  readonly createdAt: Timestamp;

  @UpdateDateColumn()
  readonly updatedAt: Timestamp;
}
