import { GetImagesDto } from './dto/get-images.dto';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { Like, Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetImagesByNameDto } from './dto/get-images-by-name.dto';
import { UserService } from 'src/user/user.service';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthService } from 'src/auth/auth.service';
import { ImageSave } from './entities/imageSave.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(ImageSave)
    private readonly imageSaveRepository: Repository<ImageSave>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async create(createImageDto: CreateImageDto, token: string) {
    // Check user
    const { email } = await this.authService.parsePayloadFromToken(token);
    const userFound = await this.userService.findOneByEmail(email);

    if (!userFound) {
      throw new BadRequestException('User not found');
    }

    const imageToSave = this.imageRepository.create(createImageDto);
    imageToSave.user = userFound;

    return await this.imageRepository.save(imageToSave);
  }

  async findAll({ page, size }: GetImagesDto) {
    return await this.imageRepository.find({
      take: size,
      skip: (page - 1) * size,
      order: { id: 'DESC' },
    });
  }

  async findAllByName({ keyword, size, page }: GetImagesByNameDto) {
    return await this.imageRepository.find({
      where: {
        image_name: Like(`%${keyword}%`),
      },
      take: size,
      skip: (page - 1) * size,
      order: { id: 'DESC' },
    });
  }

  async findUserAndImageInfoById(id: number) {
    // Check if the image with the id exists
    const image = await this.imageRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!image) {
      throw new BadRequestException('Image not found');
    }

    console.log('image: ', image);

    return { ...image, user: plainToClass(UserDto, image.user) };
  }

  async findImageComments(id: number) {
    // Check if the image with the id exists
    const image = await this.imageRepository.findOne({
      where: { id },
      relations: { comments: true },
    });

    if (!image) {
      throw new BadRequestException('Image not found');
    }

    console.log('image: ', image);

    return image.comments;
  }

  async checkIsSaveImage(token: string, imageId: number) {
    // Check user
    const { email } = await this.authService.parsePayloadFromToken(token);
    const userFound = await this.userService.findOneByEmail(email);

    if (!userFound) {
      throw new BadRequestException('User not found');
    }

    // Check image
    const imageFound = await this.imageRepository.findOne({
      where: { id: imageId },
    });

    if (!imageFound) {
      throw new BadRequestException('Image not found');
    }

    // Check image is save by the current user
    const isSave = await this.imageSaveRepository.findOne({
      where: { user: { id: userFound.id }, image: { id: imageFound.id } },
    });

    return { isSave: !!isSave };
  }

  async findImageById(id: number) {
    return await this.imageRepository.findOne({ where: { id } });
  }

  async findImagesByUserId(userId: number) {
    return await this.imageRepository.find({ where: { user: { id: userId } } });
  }

  async remove(id: number, token: string) {
    // Check user
    const { email } = await this.authService.parsePayloadFromToken(token);
    const userFound = await this.userService.findOneByEmail(email);

    if (!userFound) {
      throw new BadRequestException('User not found');
    }

    // Check image that created by this user
    const imageFound = await this.imageRepository.findOne({
      where: { id, user: { id: userFound.id } },
    });

    if (!imageFound) {
      throw new BadRequestException('This image is not created by this user');
    }

    // Delete image
    return await this.imageRepository.delete({ id: imageFound.id });
  }
}
