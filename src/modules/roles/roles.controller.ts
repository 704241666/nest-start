import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Roles } from '../../decorators/roles.decorator';
import { RoleEnum } from '../../enum/role.enum';
import { JwtGuard } from '../../guards/jwt.guard';
import { RoleGuard } from '../../guards/role.guard';
import { CaslGuard } from '../../guards/casl.guard';
import { Can, Cannot, CheckPolicies } from '../../decorators/casl.decorator';
import { Action } from '../../enum/action.enum';
import { Role } from './entities/role.entity';
@Controller('roles')
// @Roles(RoleEnum.User)
@UseGuards(
  JwtGuard,
  CaslGuard,
  //  RoleGuard
)
// @UseGuards(CaslGuard)
@CheckPolicies((ability) => ability.can(Action.READ, Role))
@Can(Action.READ, Role)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  // @Can(Action.READ, Role)
  @Cannot(Action.UPDATE, Role)
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
