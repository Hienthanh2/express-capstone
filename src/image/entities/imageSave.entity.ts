import { User } from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from './image.entity';

@Entity({ name: 'users_save_images' })
export class ImageSave {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.imageSaves)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Image, (image) => image.imageSaves)
  @JoinColumn({ name: 'image_id' })
  image: Image;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
