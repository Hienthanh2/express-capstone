import { GetImagesDto } from './dto/get-images.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Like, Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetImagesByNameDto } from './dto/get-images-by-name.dto';
import { UserService } from 'src/user/user.service';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly userService: UserService,
  ) {}

  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
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

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
