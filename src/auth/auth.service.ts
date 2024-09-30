import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { AuthToken } from './dtos/auth-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<AuthResponseDto> {
    const user = await this.userService.create(registerUserDto);
    const response: AuthResponseDto = {
      message: 'Register success!',
      data: {
        user: { _id: user._id.toString(), name: user.name, email: user.email },
      },
    };
    return response;
  }

  async login(loginUserDto: LoginUserDto): Promise<AuthResponseDto> {
    const { email, password } = loginUserDto;
    const user = await this.validateUser(email, password);
    const payload: AuthToken = { sub: user._id.toString(), email };
    const accessToken = await this.jwtService.signAsync(payload);
    const response: AuthResponseDto = {
      message: 'Login success!',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email,
        },
        accessToken,
      },
    };
    return response;
  }

  private async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }
}
