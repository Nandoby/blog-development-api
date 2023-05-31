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
    return `This action updates an article`;
  }

  remove(id) {
    return `This action removes an article`;
  }
}
