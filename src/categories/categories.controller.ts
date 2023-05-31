import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categorieService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categorieService.findAll();
  }

  @Post()
  create() {
    return this.categorieService.create();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categorieService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return this.categorieService.update(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categorieService.remove(id);
  }
}
