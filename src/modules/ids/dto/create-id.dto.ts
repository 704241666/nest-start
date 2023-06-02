import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateIdDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  id: number;
}
