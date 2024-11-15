import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  username: string;

  @IsInt()
  @IsOptional()
  @IsPositive()
  age: number;

  @IsUrl()
  @MaxLength(1000)
  @IsOptional()
  avatar_url: string;
}
