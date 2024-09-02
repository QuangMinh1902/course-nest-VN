import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './user.model';
import { Exclude, Expose, Transform } from 'class-transformer';

@Entity('users')
export default class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.GHOST })
  role: UserRole;

  @Column()
  @Transform(({ value }) => (value == 'test' ? 'minh' : value))
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;

  @Expose()
  get fullName(): string {
    return `${this.name}`;
  }
}
