import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthPayload } from './interfaces';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    return await hash(password, 12);
  }

  async comparePassword(password: string, storePasswordHash: string) {
    return await compare(password, storePasswordHash);
  }

  async signup(createUserDto: CreateUserDto) {
    // check if the user already exists
    const existingUser = await this.userService.findOneByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    // Hash password
    const hashedPassword = await this.hashPassword(createUserDto.password);

    // Create new user
    const newUser = await this.userService.createNew({
      ...createUserDto,
      password: hashedPassword,
    });

    return newUser;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = await this.comparePassword(
      password,
      user.password,
    );

    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }

  async login(loginDto: LoginDto) {
    // Validate the user
    const user = await this.validateUser(loginDto.email, loginDto.password);

    const payload: AuthPayload = {
      email: user.email,
      password: user.password,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
