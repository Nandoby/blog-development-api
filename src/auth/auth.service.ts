import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findByUsername(signInDto.username);
    if (!user) throw new UnauthorizedException();

    const loggedIn = await bcrypt.compare(signInDto.password, user.password);

    if (loggedIn) {
      const payload = { sub: user.id, username: user.username }
      return {
        access_token: await this.jwtService.signAsync(payload)
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
