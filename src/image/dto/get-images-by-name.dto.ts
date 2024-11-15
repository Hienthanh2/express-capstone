import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class GetImagesByNameDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page: number = 1;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  size: number = 10;

  @IsString()
  @IsOptional()
  keyword: string = '';
}
