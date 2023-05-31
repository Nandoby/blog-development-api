import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('roles')
export class RolesController {
  @Get()
  findAll() {
    return 'This action returns all roles';
  }

  @Post()
  create() {
    return 'This action adds a new role';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a role with id ${id}`;
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return `This action updates a #${id} role`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id}`;
  }
}
