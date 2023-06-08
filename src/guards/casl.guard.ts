import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { CaslAbilityService } from '../modules/auth/casl-ability.service';
import {
  CHECK_POLICIES_KEY,
  CaslHandlerType,
  PolicyHandlerCallback,
} from '../decorators/casl.decorator';

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityService: CaslAbilityService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log(
      '🚀 ~ file: casl.guard.ts:18 ~ CaslGuard ~ canActivate ~ context:',
      context,
    );
    const handlers = this.reflector.getAllAndOverride<PolicyHandlerCallback[]>(
      CHECK_POLICIES_KEY.HANDLER,
      [context.getHandler(), context.getClass()],
    );
    const canHandlers = this.reflector.getAllAndOverride<any[]>(
      CHECK_POLICIES_KEY.CAN,
      [context.getHandler(), context.getClass()],
    ) as CaslHandlerType;
    const cannotHandlers = this.reflector.getAllAndOverride<any[]>(
      CHECK_POLICIES_KEY.CANNOT,
      [context.getHandler(), context.getClass()],
    ) as CaslHandlerType;
    if (!handlers || !canHandlers || !cannotHandlers) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const ability = await this.caslAbilityService.forRoot(
      request.user.username,
    );
    let flag = true;
    if (handlers) {
      flag = flag && handlers.every((handler) => handler(ability));
    }
    if (flag && canHandlers) {
      if (canHandlers instanceof Array) {
        flag = flag && canHandlers.every((handler) => handler(ability));
      } else if (typeof canHandlers === 'function') {
        flag = flag && canHandlers(ability);
      }
    }
    if (flag && cannotHandlers) {
      if (cannotHandlers instanceof Array) {
        flag = flag && cannotHandlers.every((handler) => handler(ability));
      } else if (typeof cannotHandlers === 'function') {
        flag = flag && cannotHandlers(ability);
      }
    }
    return flag;
  }
}
