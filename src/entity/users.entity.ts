import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    description: 'user id',
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'user name',
    type: String,
  })
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
