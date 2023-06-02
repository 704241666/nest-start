import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  @Prop({ unique: true, index: true })
  username: string;

  @Prop({ unique: true, index: true })
  user_id: number;

  @Prop()
  @Exclude()
  password: string;

  @Prop()
  roles: [];
}

export const UserSchema = SchemaFactory.createForClass(User);
