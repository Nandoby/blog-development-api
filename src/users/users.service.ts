import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAll() {
    return 'This action returns all users';
  }

  create() {
    return 'This action adds a new users';
  }

  findOne(id) {
    return `This action returns a users #${id}`;
  }

  update(id) {
    return `This action updates a users #${id}`;
  }

  remove(id) {
    return `This action removes a users #${id}`;
  }
}
