import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwt: JwtService) {}

  async login(username: string, password: string) {
    const user = await this.userService.findOne({ username, password });
    if (user && user.code !== 500) {
      return this.jwt.signAsync(
        {
          username: user.username,
          user_id: user.user_id,
          roles: user.roles,
        },
        // { expiresIn: '1d' },
      );
    } else if (user.code === 500) {
      return user;
    }
    throw new UnauthorizedException();
  }

  async register(username: string, password: string): Promise<User | any> {
    const res = await this.userService.create({ username, password });
    return res;
  }
}
