import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  findAll() {
    return 'This action returns all categorie';
  }

  @Post()
  create() {
    return 'This action adds a new categorie';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a categorie with id ${id}`;
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return `This action updates a #${id} categorie`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id}`;
  }
}
