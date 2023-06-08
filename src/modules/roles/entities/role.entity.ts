import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
export type RoleDocument = HydratedDocument<Role>;
@Schema()
export class Role {
  @Prop()
  name: string;
  @Prop({ unique: true, index: true })
  role_id: number;
  @Prop([String])
  role_auth: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
