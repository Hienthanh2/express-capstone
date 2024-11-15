import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async createNew(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }
}
