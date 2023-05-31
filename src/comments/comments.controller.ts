import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('comments')
export class CommentsController {
  @Get()
  findAll() {
    return 'This action returns all comments';
  }

  @Post()
  create() {
    return 'This action adds a new comments';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a comments with id ${id}`;
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return `This action updates a #${id} comments`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id}`;
  }
}
