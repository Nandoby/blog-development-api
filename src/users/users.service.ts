import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  hashPassword(password: string) {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(createUserDto: CreateUserDto) {
    if (await this.emailAlreadyExists(createUserDto)) {
      throw new BadRequestException('Cette adresse email existe déjà');
    }
    const user = new User();
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = await this.hashPassword(createUserDto.password);

    const errors = await validate(user);
    if (errors.length > 0) {
      throw new Error('Validation failed!');
    } else {
      await this.usersRepository.save(user);
      return createUserDto;
    }
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    
    // Gestion de l'erreur si pas d'id
    const user = await this.usersRepository.findOneBy({id})
    if (!user) {
      throw new BadRequestException()
    }

    if (updateUserDto.password) {
      this.hashPassword(updateUserDto.password)
    }

    // Update de mon user
    this.usersRepository.update({
      id
    }, updateUserDto)
    

    return {
      status: 'updated',
      data: updateUserDto
    }


  }

  remove(id) {
    return `This action removes a users #${id}`;
  }

  async emailAlreadyExists(user) {
    const email = await this.usersRepository.findOneBy({
      email: user.email,
    });
    return !!email;
  }
}
