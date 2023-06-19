import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UpdateArticleDto } from './dto/updateArticle.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddCommentDto } from './dto/addComment.dto';
import { ArticlesOwnerGuard } from 'src/guards/articlesOwner.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Article } from './article.entity';
import { Comment } from '../comments/comment.entity';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @ApiOkResponse({ description: 'Return all articles', type: [Article] })
  @Get()
  async findAll(@Query() query) {
    return await this.articlesService.findAll(query);
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'The record has been successfully created',
    type: Article,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createArticleDto: CreateArticleDto, @Request() req) {
    return this.articlesService.create(createArticleDto, req.user);
  }

  @ApiOkResponse({ type: Article, description: 'The result of query search' })
  @Get('search')
  async search(@Query('q') query: string) {
    return this.articlesService.search(query);
  }

  @ApiOkResponse({ type: Article, description: 'Find an article by id' })
  @ApiBadRequestResponse({ description: 'Article is not found' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.articlesService.findOne(id);
  }

  @Get('/categories/:id')
  async findArticleByCategory(@Param('id', ParseIntPipe) categoryId: number) {
    return this.articlesService.findByCategory(categoryId)
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: Article })
  @ApiUnauthorizedResponse({ description: 'Unauthorized ' })
  @UseGuards(AuthGuard, ArticlesOwnerGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedArticle: UpdateArticleDto,
  ) {
    return await this.articlesService.update(id, updatedArticle);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, ArticlesOwnerGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.articlesService.remove(id);
  }

  // Sub-Resource : Comments

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Comment })
  @UseGuards(AuthGuard)
  @Post(':id/comments')
  async addComment(
    @Param('id') id,
    @Body() addComment: AddCommentDto,
    @Request() req,
  ) {
    return this.articlesService.addComment(id, addComment, req.user);
  }
}
