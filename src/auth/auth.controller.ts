import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthResponseDto } from './dtos/auth-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<AuthResponseDto> {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto): Promise<AuthResponseDto> {
    return this.authService.login(loginUserDto);
  }
}
