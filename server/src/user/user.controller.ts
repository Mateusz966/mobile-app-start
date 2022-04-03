import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserAccReqDto } from './dto/create-user-acc-req.dto';
import { UserService } from './user.service';
import { CreateUserAccResDto } from './dto/create-user-acc-res.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async userDetails(@Req() req) {
    return req.user;
  }

  @Post('/sign-up')
  async createUserAcc(
    @Body() createUserAccDto: CreateUserAccReqDto,
  ): Promise<CreateUserAccResDto> {
    return await this.userService.createUserAcc(createUserAccDto);
  }
}
