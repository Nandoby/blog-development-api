import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiTags('Categories - Admin')

@Roles('Admin')
@Controller('categories')
export class CategoriesController {
  constructor(private categorieService: CategoriesService) {}

  @Get()
  async findAll() {
    return this.categorieService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categorieService.create(createCategoryDto);
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categorieService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categorieService.update(id, updateCategoryDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categorieService.remove(id);
  }
}
