import UserEntity from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tokens')
export default class TokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accessToken: string;

  @ManyToOne(() => UserEntity, (author: UserEntity) => author.tokens)
  author: UserEntity;
}
