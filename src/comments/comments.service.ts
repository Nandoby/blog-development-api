import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { UpdateCommentDto } from './dto/updateComment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async findAll() {
    return this.commentRepository.find({
      relations: {
        user: true,
        article: true,
      },
    });
  }

  async findOne(id) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: {
        user: true,
        article: true,
      },
    });
    if (!comment) throw new NotFoundException();
    return comment;
  }

  async update(id, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.findOneBy({ id });
    if (!comment) throw new NotFoundException();
    comment.content = updateCommentDto.content;
    return await this.commentRepository.save(comment);
  }
}
