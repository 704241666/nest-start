import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtGuards extends AuthGuard('jwt') {
  constructor() {
    super();
  }
  canActivate(context) {
    return super.canActivate(context);
  }
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
