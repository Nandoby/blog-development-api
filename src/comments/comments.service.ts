import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {
  findAll() {
    return 'This action returns all comments';
  }

  create() {
    return 'This action adds a new comments';
  }

  findOne(id) {
    return `This action returns a comments #${id}`;
  }

  update(id) {
    return `This action updates an comments`;
  }

  remove(id) {
    return `This action removes an comments`;
  }
}
