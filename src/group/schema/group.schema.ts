
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { GroupEnum } from '../../common/enum/user.enum';
import { GroupUser } from '../../group-users/schema/group-user.schema';

export type GroupDocument = HydratedDocument<Group>;

@Schema({ versionKey: false })
export class Group {
    @Prop({ required: true })
    name: string;


    @Prop({
        type: String,
        enum: GroupEnum,
        default: GroupEnum.ACTIVE,
    })
    status: GroupEnum;


    @Prop({
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "GroupUser"
        }]
    })
    groupUser: GroupUser[];

}

export const groupSchema = SchemaFactory.createForClass(Group);