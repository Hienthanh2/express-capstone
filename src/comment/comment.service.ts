import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly imageService: ImageService,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create({ imageId, content }: CreateCommentDto, token: string) {
    // Check user
    const { email } = await this.authService.parsePayloadFromToken(token);
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Check image
    const image = await this.imageService.findImageById(imageId);
    if (!image) {
      throw new BadRequestException('Image not found');
    }

    // Create comment
    const comment = await this.commentRepository.save({ user, image, content });

    return { comment };
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
