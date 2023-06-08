import { Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  createMongoAbility,
  MongoAbility,
  ExtractSubjectType,
} from '@casl/ability';
import { Role } from '../roles/entities/role.entity';
import { UserService } from '../user/user.service';
import { Action } from '../../enum/action.enum';

type Actions = 'read' | 'update';
type Subjects = Role | typeof Role;
type AppAbility = MongoAbility<[Actions, Subjects]>;
// 基于CASL的权限控制
@Injectable()
export class CaslAbilityService {
  constructor(private readonly userService: UserService) {}
  async forRoot(username: string) {
    // 针对不同的用户，返回不同的权限
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );
    const user = await this.userService.findOneByName(username);
    console.log(
      '🚀 ~ file: casl-ability.service.ts:24 ~ CaslAbilityService ~ forRoot ~ user:',
      user,
    );
    can(Action.READ, Role);
    cannot(Action.UPDATE, Role);
    const ability = build({
      detectSubjectType: (object) =>
        object.constructor as ExtractSubjectType<Subjects>,
    });
    return ability;
  }
}
