import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { plainToClass } from 'class-transformer';
import { UserDto } from './dto/user.dto';
import { ImageSave } from 'src/image/entities/imageSave.entity';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(ImageSave)
    private readonly ImageSaveRepository: Repository<ImageSave>,
    @Inject(forwardRef(() => ImageService))
    private readonly imageService: ImageService,
  ) {}

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async createNew(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async getUserInfo(token: string) {
    const { email } = await this.authService.parsePayloadFromToken(token);

    const user = await this.findOneByEmail(email);

    return plainToClass(UserDto, user);
  }

  async getSavedImagesByUser(token: string) {
    const { email } = await this.authService.parsePayloadFromToken(token);

    const user = await this.findOneByEmail(email);

    const images = await this.ImageSaveRepository.find({
      where: { user: { id: user.id } },
      relations: {
        image: true,
      },
    });

    return images.map((item) => item.image);
  }

  async getCreatedImagesByUser(token: string) {
    const { email } = await this.authService.parsePayloadFromToken(token);

    const user = await this.findOneByEmail(email);

    const images = await this.imageService.findImagesByUserId(user.id);

    return images;
  }
}
