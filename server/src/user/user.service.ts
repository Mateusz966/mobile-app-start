import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserAccReqDto } from './dto/create-user-acc-req.dto';
import { UserRepository } from './repository/user.repository';
import { User } from './entity/user.entity';
import { CreateUserAccResDto } from './dto/create-user-acc-res.dto';
import { Errors } from '../errors';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async createUserAcc({
    email,
    password,
  }: CreateUserAccReqDto): Promise<CreateUserAccResDto> {
    const existedUser = await this.userRepo.getByEmail(email);

    if (existedUser) {
      throw new HttpException(Errors.EMAIL_EXIST, HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(email, hashedPassword);
    await this.userRepo.persistAndFlush(user);
    return user;
  }
}
