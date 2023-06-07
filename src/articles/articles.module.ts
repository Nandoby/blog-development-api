import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Category } from 'src/categories/category.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { Comment } from 'src/comments/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Category, User, Comment])],
  controllers: [ArticlesController],
  providers: [ArticlesService, JwtService],
})
export class ArticlesModule {}
