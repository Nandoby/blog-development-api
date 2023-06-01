import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
