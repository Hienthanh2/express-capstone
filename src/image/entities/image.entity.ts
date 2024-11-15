import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ImageSave } from './imageSave.entity';
import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Entity({ name: 'images' })
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  image_name: string;

  @Column({ type: 'text' })
  image_url: string;

  @Column({ type: 'varchar', length: 1000 })
  image_description: string;

  @ManyToOne(() => User, (user) => user.images_created)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ImageSave, (ImageSave) => ImageSave.image)
  imageSaves: ImageSave[];

  @OneToMany(() => Comment, (comment) => comment.image)
  comments: Comment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
