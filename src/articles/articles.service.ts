import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/createArticle.dto';
import { Category } from 'src/categories/category.entity';
import { UpdateArticleDto } from './dto/updateArticle.dto';

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
    const { title, content, coverImage } = createArticleDto;

    const article = new Article();
    article.title = title;
    article.content = content;
    if (coverImage) article.coverImage = coverImage;

    const categories = await this.categoryRepository.findBy(
      createArticleDto.categories,
    );

    article.categories = categories;

    return this.articleRepository.save(article);
  }

  async findOne(id) {
    const article = await this.articleRepository.findOneBy({ id });
    if (!article) throw new BadRequestException(`Aucune article n'a été trouvée ayant l'id ${id}`)
    return article
    
  }

  async update(id, updatedArticle: UpdateArticleDto) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: {
        categories: true
      }
    })
    if (!article) throw new NotFoundException(`Aucun article trouvé avec cet id`)

    const { categories } = updatedArticle

    const categoryId = await this.categoryRepository.findBy(categories)

    if (!categoryId.length) throw new NotFoundException('Aucune catégorie ne correspond a cet id')
    
  } 

  remove(id) {
    return `This action removes a article #${id}`;
  }
  
}
