import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/createArticle.dto';
import { Category } from 'src/categories/category.entity';
import { Comment } from 'src/comments/comment.entity';
import { UpdateArticleDto } from './dto/updateArticle.dto';
import { User } from 'src/users/user.entity';
import { AddCommentDto } from './dto/addComment.dto';
import { UserRequest } from 'src/interfaces/userRequest.interface';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async findAll(query) {
    // Get 3 last articles
    if (query.lastArticles) {
      const lastArticles = Number(query.lastArticles);

      return await this.articleRepository.find({
        order: {
          id: { direction: 'DESC' },
        },
        take: lastArticles,
        relations: ['categories', 'user', 'comments.user'],
      });
    }

    return await this.articleRepository.find({
      relations: ['categories', 'user', 'comments.user'],
    });
  }

  async create(createArticleDto: CreateArticleDto, userRequest) {
    const { title, content, coverImage } = createArticleDto;

    const user = await this.userRepository.findOneBy({ id: userRequest.sub });
    const article = new Article();
    article.title = title;
    article.content = content;
    if (coverImage) article.coverImage = coverImage;

    const categories = await this.categoryRepository.findBy(
      createArticleDto.categories,
    );

    article.categories = categories;

    article.user = user;

    return this.articleRepository.save(article);
  }

  async findOne(id) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
    if (!article)
      throw new BadRequestException(
        `Aucune article n'a été trouvée ayant l'id ${id}`,
      );
    return article;
  }

  async update(id, updatedArticle: UpdateArticleDto) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: {
        categories: true,
      },
    });
    if (!article)
      throw new NotFoundException(`Aucun article trouvé avec cet id`);

    const category = await this.categoryRepository.findBy(
      updatedArticle.categories,
    );

    if (!category.length)
      throw new NotFoundException('Aucune catégorie ne correspond a cet id');

    article.title = updatedArticle.title;
    article.content = updatedArticle.content;
    article.coverImage = updatedArticle.coverImage;
    article.categories = category;

    return await this.articleRepository.save(article);
  }

  async remove(id) {
    const article = await this.articleRepository.findOneBy({ id });
    if (!article) throw new NotFoundException('Aucun article trouvé');
    await this.articleRepository.remove(article);
  }

  // Sub-Resources : Comments

  async addComment(id, addComment: AddCommentDto, userRequest: UserRequest) {
    const article = await this.findOne(id);
    const user = await this.userRepository.findOneBy({ id: userRequest.sub });
    if (!user) throw new NotFoundException('Aucun utilisateur trouvé');
    if (!article) throw new NotFoundException('Aucun article trouvé');
    const comment = new Comment();
    comment.article = article;
    comment.user = user;
    comment.content = addComment.content;
    return await this.commentRepository.save(comment);
  }

  async search(search: string) {
    const query = await this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.categories', 'category')
      .leftJoinAndSelect('article.user', 'user')
      .leftJoinAndSelect('article.comments', 'comments')
      .where('category.name LIKE :search OR article.title LIKE :search', {
        search: `%${search}%`,
      });

    const result = await query.getMany();

    if (result.length) {
      return await query.getMany();
    } else {
      throw new NotFoundException();
    }
  }
}
