import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignInDto } from './dto/user.signin.dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  async signup(@Body() body: UserSignUpDto): Promise<UserEntity> {
    return await this.userService.signup(body);
  }

  @Post('signin')
  async signin(@Body() body: UserSignInDto): Promise<{
    accessToken: string;
    user: UserEntity;
  }> {
    const user = await this.userService.signin(body);

    const accessToken = await this.userService.accessToken(user);

    return { accessToken, user };
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    //return this.userService.create(createUserDto);
    return "hello"
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
