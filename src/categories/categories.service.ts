import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) { }

  async findAll() {
    return this.categoryRepository.find({
      order: { name: "ASC" },
      relations: ['articles', 'articles.user', 'articles.comments']
    })
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryExists = await this.categoryRepository.findOneBy({ name: createCategoryDto.name})
    if (categoryExists) throw new UnauthorizedException('Cette catégorie existe déjà')
    const category = new Category()
    category.name = createCategoryDto.name

    return await this.categoryRepository.save(category)

  }

  async findOne(id) {
    const category = await this.categoryRepository.findOneBy({id})
    if (!category) throw new NotFoundException()
    return category;
  }

  async update(id, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy( { id } )
    const categoryExists = await this.categoryRepository.findOneBy({ name: updateCategoryDto.name})
    if (!category) throw new NotFoundException()
    category.name = updateCategoryDto.name
    console.log(category)

    if (!categoryExists)  return this.categoryRepository.save(category)
    
  }

  async remove(id) {
    const category = await this.categoryRepository.findOneBy({id})
    if (!category) throw new NotFoundException()
    await this.categoryRepository.remove(category)
  }
}
