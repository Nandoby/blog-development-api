import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesService {
  findAll() {
    return 'This action returns all roles';
  }

  create() {
    return 'This action adds a new roles';
  }

  findOne(id) {
    return `This action returns a roles #${id}`;
  }

  update(id) {
    return `This action updates a roles #${id}`;
  }

  remove(id) {
    return `This action removes a roles #${id}`;
  }
}
