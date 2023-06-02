import { Injectable } from '@nestjs/common';
import { CreateIdDto } from './dto/create-id.dto';
import { UpdateIdDto } from './dto/update-id.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ids } from './entities/ids.entity';
import { Model } from 'mongoose';

@Injectable()
export class IdsService {
  constructor(@InjectModel(Ids.name) private readonly IdsModel: Model<Ids>) {}
  async create(createIdDto: CreateIdDto) {
    return await this.IdsModel.create(createIdDto);
  }

  findAll() {
    return `This action returns all ids`;
  }

  findOne(id: number) {
    return `This action returns a #${id} id`;
  }

  update(id: number, updateIdDto: UpdateIdDto) {
    return `This action updates a #${id} id`;
  }
  async getIds(name: string) {
    const Ids = await this.IdsModel.findOneAndUpdate(
      { name },
      { $inc: { id: 1 } },
      { new: true, upsert: true },
    );
    return Ids.id;
  }
  remove(id: number) {
    return `This action removes a #${id} id`;
  }
}
