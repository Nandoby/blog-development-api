import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UpdateArticleDto } from './dto/updateArticle.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddCommentDto } from './dto/addComment.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  async findAll() {
    return await this.articlesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createArticleDto: CreateArticleDto, @Request() req) {
    return this.articlesService.create(createArticleDto, req.user);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatedArticle: UpdateArticleDto) {
    return await this.articlesService.update(id, updatedArticle);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.articlesService.remove(id);
  }

  // Sub-Resource : Comments 

  @UseGuards(AuthGuard)
  @Post(':id/comments')
  async addComment(@Param('id') id, @Body() addComment: AddCommentDto, @Request() req) {
     return this.articlesService.addComment(id, addComment, req.user)
  }
}
