import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
// import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.userService.findOneByName(request.user.username);
    if (user) {
      return true;
    }
    return false;
  }
}
