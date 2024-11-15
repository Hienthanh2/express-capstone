import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  @IsPositive()
  imageId: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  content: string;
}
