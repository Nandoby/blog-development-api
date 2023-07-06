import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findByEmail(signInDto.email);
    if (!user) throw new UnauthorizedException();

    const loggedIn = await bcrypt.compare(signInDto.password, user.password);

    if (loggedIn) {
      const payload = { sub: user.id, username: user.username, roles: user.roles }
      return {
        access_token: await this.jwtService.signAsync(payload),
        user
      }
    } else {
      throw new UnauthorizedException();
    }
  }

  async register(registerDto: RegisterDto) {
    const { email, password, picture, username } = registerDto

    const findUser = await this.userRepository.findBy({ email })

    if (findUser.length) throw new HttpException('Cet email existe deja', HttpStatus.BAD_REQUEST)

    const user = new User()
    user.username = username
    user.email = email
    user.password = bcrypt.hashSync(password, 10) 
    if (picture) user.picture = picture

    return this.userRepository.save(user)
  }
}
