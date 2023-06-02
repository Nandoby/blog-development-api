import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/createArticle.dto';
import { Category } from 'src/categories/category.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    return await this.articleRepository.find({
      relations: {
        categories: true,
      },
    });
  }

  async create(createArticleDto: CreateArticleDto) {

    const { title, content, coverImage } = createArticleDto

    const article = new Article()
    article.title = title
    article.content = content 
    if (coverImage) article.coverImage = coverImage

    const categories = await this.categoryRepository.findBy(createArticleDto.categories)

    article.categories = categories

    return this.articleRepository.save(article)
  }

  findOne(id) {
    return `This action returns a article #${id}`;
  }

  update(id) {
    return `This action updates a article #${id}`;
  }

  remove(id) {
    return `This action removes a article #${id}`;
  }
}
