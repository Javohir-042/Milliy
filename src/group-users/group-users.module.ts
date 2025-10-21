import { Module } from '@nestjs/common';
import { GroupUsersService } from './group-users.service';
import { GroupUsersController } from './group-users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, groupSchema } from '../group/schema/group.schema';
import { User, UserSchema } from '../users/schema/user.schema';
import { GroupUser, GroupUserSchema } from './schema/group-user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GroupUser.name,
        schema: GroupUserSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Group.name,
        schema: groupSchema
      }
    ])
  ],
  controllers: [GroupUsersController],
  providers: [GroupUsersService],
})
export class GroupUsersModule { }
