import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(
    @Headers('token') token: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.create(createCommentDto, token);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
