import { Module } from '@nestjs/common';
import { RelationService } from './relation.service';
import { RelationController } from './relation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Relation, RelationSchema } from './schema/relation.schema';
import { User, UserSchema } from '../users/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Relation.name,
        schema: RelationSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      }
    ])
  ],
  controllers: [RelationController],
  providers: [RelationService],
})
export class RelationModule {}
