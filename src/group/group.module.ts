import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, groupSchema } from './schema/group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Group.name,
        schema: groupSchema
      }
    ])
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
