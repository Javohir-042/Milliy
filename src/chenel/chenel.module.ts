import { Module } from '@nestjs/common';
import { ChenelService } from './chenel.service';
import { ChenelController } from './chenel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chenel, chenelSchema } from './schema/chenel.schema';
import { User, UserSchema } from '../users/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Chenel.name,
        schema: chenelSchema,
      },
      {
        name: User.name,
        schema: UserSchema
      }
    ])
  ],
  controllers: [ChenelController],
  providers: [ChenelService],
})
export class ChenelModule {}
