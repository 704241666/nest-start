import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as config from 'config';
import { ConfigEnum } from '../../enum/config.enum';
@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get(ConfigEnum.SECRET),
    });
  }

  async validate(payload: any) {
    return { userId: payload.user_id, username: payload.username };
  }
}
