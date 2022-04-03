import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserAccReqDto } from './dto/create-user-acc-req.dto';
import { UserService } from './user.service';
import { CreateUserAccResDto } from './dto/create-user-acc-res.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/sign-up')
  async createUserAcc(
    @Body() createUserAccDto: CreateUserAccReqDto,
  ): Promise<CreateUserAccResDto> {
    return await this.userService.createUserAcc(createUserAccDto);
  }
}
