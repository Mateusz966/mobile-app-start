import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';

interface ICreateUserAccResDto {
  email: string;
  id: string;
  isActive: boolean;
}

export class CreateUserAccResDto implements ICreateUserAccResDto {
  @IsEmail()
  email: string;

  @IsString()
  id: string;

  @IsBoolean()
  isActive: boolean;
}
