import { PartialType } from '@nestjs/mapped-types';
import { CreateIdDto } from './create-id.dto';

export class UpdateIdDto extends PartialType(CreateIdDto) {}
