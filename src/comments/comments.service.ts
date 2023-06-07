import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {
  findAll() {
    return 'This action returns all comments';
  }

  findOne(id) {
    return `This action returns a comments #${id}`;
  }

  update(id) {
    return `This action updates a comments #${id}`;
  }

  remove(id) {
    return `This action removes a comments #${id}`;
  }
}
