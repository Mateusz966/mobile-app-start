import { IsBoolean, IsEmail, IsString } from 'class-validator';

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
