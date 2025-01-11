import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignUpDto } from './dto/user-signup.dto';
import { hash } from 'bcrypt';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) { }


  async findUserByEmail(email: string): Promise<UserEntity | null> {
    if (!email) {
      throw new BadRequestException("Email is required");
    }
    return await this.usersRepository.findOneBy({ email });
  }

  async signup(body: UserSignUpDto): Promise<UserEntity> {

    const userExists = await this.findUserByEmail(body.email);

    if (userExists) {
      throw new BadRequestException("Email is not Available")
    }
    body.password = await hash(body.password, 10);

    const userLogin = this.usersRepository.create(body);
    return await this.usersRepository.save(userLogin);
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // async findUserByEmail(email: string) {
  //   return await this.usersRepository.findOneBy({ email })
  // }


}
