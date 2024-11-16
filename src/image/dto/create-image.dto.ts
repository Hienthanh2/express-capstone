import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateImageDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  image_name: string;

  @IsUrl()
  @MaxLength(1000)
  @IsNotEmpty()
  image_url: string;

  @IsString()
  @IsOptional()
  image_description: string;
}
