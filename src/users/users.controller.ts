import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return 'This action returns all user';
  }

  @Post()
  create() {
    return 'This action adds a new user';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a user with id ${id}`;
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return `This action updates a #${id} user`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id}`;
  }
}
