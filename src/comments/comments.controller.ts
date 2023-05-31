import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {CommentsService} from "./comments.service";

@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) { }
  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Post()
  create() {
    return this.commentService.create();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return this.commentService.update(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}
