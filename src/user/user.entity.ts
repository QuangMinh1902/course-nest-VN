import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './user.model';
import { Exclude, Expose, Transform } from 'class-transformer';
import TokenEntity from 'src/token/token.entity';

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

  @Column({ nullable: true })
  @Exclude()
  tokenResetPass: string;

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

  @OneToMany(() => TokenEntity, (token: TokenEntity) => token.author)
  public tokens: TokenEntity[];
}
