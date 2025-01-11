import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserSignUpDto{
    static email(email: any) {
      throw new Error('Method not implemented.');
    }

    @IsNotEmpty({message:"Name can not be Null"})
    @IsString({message:"Name should be a String"})
    name : string;

    @IsNotEmpty({message:"Name can not be Empty"})
    @IsEmail({},{message:"Please Provide a Valid Email"})
    email: string;

    @IsNotEmpty({message:"Name can not be Empty"})
    @MinLength(5,{message:"Password should be contain 5 Character"})
    password: string;
  
  }