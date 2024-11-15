import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { GetImagesDto } from './dto/get-images.dto';
import { GetImagesByNameDto } from './dto/get-images-by-name.dto';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imageService.create(createImageDto);
  }

  @Get()
  findAll(@Query() getImagesDto: GetImagesDto) {
    console.log('params: ', getImagesDto);
    return this.imageService.findAll(getImagesDto);
  }

  @Get('/get-images-by-name')
  findAllByName(@Query() getImagesByNameDto: GetImagesByNameDto) {
    return this.imageService.findAllByName(getImagesByNameDto);
  }

  @Get('/get-info-by-image-id/:id')
  findUserAndImageInfoById(@Param('id') imageId: string) {
    return this.imageService.findUserAndImageInfoById(+imageId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
