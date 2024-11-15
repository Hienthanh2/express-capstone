import { Exclude, Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  username: string;

  @Expose()
  age: number;

  @Expose()
  avatar_url: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
