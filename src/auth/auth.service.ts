import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findByUsername(signInDto.username);
    if (!user) throw new UnauthorizedException();

    const loggedIn = await bcrypt.compare(signInDto.password, user.password);

    if (loggedIn) {
      const { password, ...result } = user;
      // TODO: Generate a JWT and return it here
      // instead of the user object
      return user;
    } else {
        throw new UnauthorizedException();
    }
  }
}
