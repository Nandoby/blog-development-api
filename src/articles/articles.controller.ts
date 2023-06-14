import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request, ParseIntPipe, Query} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UpdateArticleDto } from './dto/updateArticle.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddCommentDto } from './dto/addComment.dto';
import { ArticlesOwnerGuard } from 'src/guards/articlesOwner.guard';
import {ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Article} from "./article.entity";

@ApiTags('Articles')
@Controller('api/articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @ApiResponse({ status: 200, type: [Article] })
  @Get()
  async findAll() {
    const articles = await this.articlesService.findAll();
    return { articles }
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: [Article]})
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createArticleDto: CreateArticleDto, @Request() req) {
    return this.articlesService.create(createArticleDto, req.user);
  }

  @ApiResponse( { status: 200, type: [Article]})
  @ApiQuery({ name: 'q', required: false })
  @Get('search')
  async search(@Query('q') query: string) {
    return this.articlesService.search(query)
  }
  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.articlesService.findOne(id);
  }

  @UseGuards(AuthGuard, ArticlesOwnerGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatedArticle: UpdateArticleDto) {
    return await this.articlesService.update(id, updatedArticle);
  }

  @UseGuards(AuthGuard, ArticlesOwnerGuard)
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
