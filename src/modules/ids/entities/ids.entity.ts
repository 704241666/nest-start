import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
export type IdsDocument = HydratedDocument<Ids>;
@Schema()
export class Ids {
  @Prop({ unique: true, index: true })
  name: string;

  @Prop()
  id: number;
}

export const IdsSchema = SchemaFactory.createForClass(Ids);
