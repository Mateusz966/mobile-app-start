export interface LoginUserDto {
  email: string;
  id: string;
  isActive: boolean;
}

export interface LoginUserDtoReq {
  user: LoginUserDto;
}
