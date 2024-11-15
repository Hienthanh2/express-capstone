import { ImageSave } from '../../image/entities/imageSave.entity';
import { Comment } from '../../comment/entities/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from 'src/image/entities/image.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  avatar_url: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => ImageSave, (ImageSave) => ImageSave.user)
  imageSaves: ImageSave[];

  @OneToMany(() => Image, (image) => image.user)
  images_created: Image[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
