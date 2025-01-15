import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignUpDto } from './dto/user-signup.dto';
import { compare, hash } from 'bcrypt';
import { UserSignInDto } from './dto/user.signin.dto';
import { sign } from 'jsonwebtoken';


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

  async accessToken(user:UserEntity): Promise<string>{
    return sign({id:user.id, email:user.email},process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:process.env.ACCESS_TOKEN_EXPIRE_TIME})
  }

  async refreshToken(user:UserEntity): Promise<string>{
    return sign({id:user.id, email:user.email},process.env.REFRESH_TOKEN_SECRET_KEY,{expiresIn:process.env.REFRESH_TOKEN_EXPIRE_TIME})
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


  async signin(body: UserSignInDto): Promise<UserEntity> {

    const userExists = await this.usersRepository.createQueryBuilder('users').addSelect('users.password').where('users.email=email', { email: body.email }).getOne();
    //console.log(userExists);
    
    if (!userExists) {
      throw new BadRequestException("Bad creadential")
    }
    const matchPassword = await compare(body.password, userExists.password);
    if (!matchPassword) {
      throw new BadRequestException("Bad creadential")
    }

    return userExists;
  }



  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(){
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { id } });
    return user; 
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


}
