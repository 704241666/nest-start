import { Global, Module } from '@nestjs/common';
import { IdsService } from './ids.service';
import { IdsController } from './ids.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ids, IdsSchema } from './entities/ids.entity';
@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: Ids.name, schema: IdsSchema }])],
  controllers: [IdsController],
  providers: [IdsService],
  exports: [IdsService],
})
export class IdsModule {}
