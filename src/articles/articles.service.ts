import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticlesService {
  findAll() {
    return 'This action returns all article';
  }

  create() {
    return 'This action adds a new article';
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
