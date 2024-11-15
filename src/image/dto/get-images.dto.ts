import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class GetImagesDto {
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
}
