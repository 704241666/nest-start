import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IdsService } from './ids.service';
import { CreateIdDto } from './dto/create-id.dto';
import { UpdateIdDto } from './dto/update-id.dto';
import { dbSreverDecorator } from '../../filters/dbserver-filters.filter';
@dbSreverDecorator()
@Controller('ids')
export class IdsController {
  constructor(private readonly idsService: IdsService) {}

  @Post('/create')
  create(
    @Body()
    createIdDto: CreateIdDto,
  ) {
    return this.idsService.create(createIdDto);
  }

  @Get()
  findAll() {
    return this.idsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.idsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIdDto: UpdateIdDto) {
    return this.idsService.update(+id, updateIdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.idsService.remove(+id);
  }
}
