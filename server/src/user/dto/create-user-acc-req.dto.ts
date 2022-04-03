import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { Match } from '../../../validator/match.decorator';

interface ICreateUserAccReqDto {
  email: string;
  password: string;
  repeatPassword: string;
}

export class CreateUserAccReqDto implements ICreateUserAccReqDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('password')
  repeatPassword: string;
}
