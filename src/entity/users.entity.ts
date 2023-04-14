import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Exclude()
  @Column({ length: 512 })
  passwordHash: string;

  @Exclude()
  @CreateDateColumn()
  readonly createdAt: Timestamp;

  @Exclude()
  @UpdateDateColumn()
  readonly updatedAt: Timestamp;
}
