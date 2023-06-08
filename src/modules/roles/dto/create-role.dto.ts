import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  role_id?: number;

  @IsString({ each: true })
  role_auth?: string[];
}
