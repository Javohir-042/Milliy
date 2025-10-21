import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { GroupModule } from './group/group.module';
import { GroupUsersModule } from './group-users/group-users.module';
import { RelationModule } from './relation/relation.module';
import { ChatModule } from './chat/chat.module';
import { ChenelModule } from './chenel/chenel.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AdminModule,
    AuthModule,
    UsersModule,
    RegionModule,
    DistrictModule,
    GroupModule,
    GroupUsersModule,
    RelationModule,
    ChatModule,
    ChenelModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
