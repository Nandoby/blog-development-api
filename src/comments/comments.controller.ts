import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UpdateCommentDto } from './dto/updateComment.dto';
import {ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";

@ApiTags('Commentaires - Admin')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles('Admin')
@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Get()
  @ApiOkResponse({ description: 'Get all comments'})
  @ApiUnauthorizedResponse({ description: 'You need to log in to access the resource'})
  findAll() {
    return this.commentService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }
}
