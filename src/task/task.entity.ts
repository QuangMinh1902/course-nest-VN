import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class TaskEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public description: string;
}
