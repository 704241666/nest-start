import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './entities/role.entity';
import { Model } from 'mongoose';
import { IdsService } from '../ids/ids.service';
import { Action } from '../../enum/action.enum';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
    private readonly idsService: IdsService,
  ) {
    this.findOne(0).then((res) => {
      if (!res) {
        this.roleModel.create({
          name: '超级管理员',
          role_id: 0,
          role_auth: [Action.READ, Action.CREATE, Action.UPDATE, Action.DELETE],
        });
      }
    });
  }
  async create(createRoleDto: CreateRoleDto) {
    console.log(
      '🚀 ~ file: roles.service.ts:27 ~ RolesService ~ create ~ createRoleDto:',
      createRoleDto,
    );
    const role = await this.findOneByName(createRoleDto.name);
    if (role) {
      throw new ConflictException('角色名已存在');
    }
    const Ids = await this.idsService.getIds('role_id');
    createRoleDto.role_id = Ids;
    return this.roleModel.create(createRoleDto);
  }

  findAll() {
    return this.roleModel.find();
  }

  findOne(id: number) {
    return this.roleModel.findOne({ role_id: id });
  }
  findOneByName(name: string) {
    return this.roleModel.findOne({ name });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleModel.findByIdAndUpdate(id, updateRoleDto);
  }

  remove(id: number) {
    return this.roleModel.findByIdAndDelete(id);
  }
}
