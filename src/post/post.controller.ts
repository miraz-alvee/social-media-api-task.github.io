import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { PostEntity } from './entities/post.entity';
import { QueryPostDto } from './dto/query-post.dto';


@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }


  @Post()
  async createPost(@Body() createPostDto: CreatePostDto, @Request() req): Promise<PostEntity> {
    return await this.postService.createPost(createPostDto, req.currentUser);
  }

  @Get()
  async getAllPost(@Query() query: QueryPostDto): Promise<{
    data: PostEntity[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    return await this.postService.getAllPost(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  async updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Request() req){
    return await this.postService.updatePost(+id, updatePostDto, req.currentUser);
  }


  @Delete(':id')
  deletePost(@Param('id') id: number, @Request() req) {
    return this.postService.deletePost(id, req.currentUser);
  }
  
}
