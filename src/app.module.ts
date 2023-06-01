import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { RolesModule } from './roles/roles.module';
import { CommentsModule } from './comments/comments.module';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'blog-api',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    ArticlesModule,
    RolesModule,
    CommentsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
