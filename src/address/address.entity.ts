import UserEntity from 'src/user/user.entity';
import { OneToOne } from 'typeorm';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('addresses')
export default class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @OneToOne(() => UserEntity, (user: UserEntity) => user.address)
  user: UserEntity;
}
