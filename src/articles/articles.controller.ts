import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('articles')
export class ArticlesController {
  @Get()
  findAll() {
    return 'This action returns all article';
  }

  @Post()
  create() {
    return 'This action adds a new article';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a article with id ${id}`;
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return `This action updates a #${id} article`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id}`;
  }
}
