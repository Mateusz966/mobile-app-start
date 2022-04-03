import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { Errors } from '../errors';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepo.getByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException(Errors.WRONG_CREDENTIALS, HttpStatus.BAD_REQUEST);
  }

  async login({ email, id, isActive }: LoginUserDto) {
    const payload = { email, id, isActive };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
