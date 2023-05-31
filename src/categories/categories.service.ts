import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  findAll() {
    return 'This action returns all categorie';
  }

  create() {
    return 'This action adds a new categorie';
  }

  findOne(id) {
    return `This action returns a categorie #${id}`;
  }

  update(id) {
    return `This action updates a categorie #${id}`;
  }

  remove(id) {
    return `This action removes a categorie #${id}`;
  }
}
