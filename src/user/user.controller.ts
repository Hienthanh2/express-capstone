import { Body, Controller, Get, Headers, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUserInfo(@Headers('token') token: string) {
    return this.userService.getUserInfo(token);
  }

  @Get('saved-images')
  getSavedImagesByUser(@Headers('token') token: string) {
    return this.userService.getSavedImagesByUser(token);
  }

  @Get('created-images')
  getCreatedImagesByUser(@Headers('token') token: string) {
    return this.userService.getCreatedImagesByUser(token);
  }

  @Patch()
  updateUserInfo(
    @Headers('token') token: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(token, updateUserDto);
  }
}
