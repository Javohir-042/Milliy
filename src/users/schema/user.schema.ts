import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Gender } from '../../common/enum/user.enum';
import { GroupUser } from '../../group-users/schema/group-user.schema';
import { ref } from 'process';
import { Relation } from '../../relation/schema/relation.schema';
import { Chat } from 'telegraf/types';
import { Chenel } from '../../chenel/schema/chenel.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true })
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    user_name: string;

    @Prop({ required: true })
    phone_number: string;

    @Prop({ required: true, enum: Gender })
    gender: Gender;

    @Prop({ default: '' })
    bio: string;

    @Prop({ required: true })
    age: number;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    protection: string;

    @Prop({ default: true })
    is_active: boolean;

    @Prop({ default: false })
    is_verified: boolean;

    @Prop({ default: null })
    refresh_token?: string;


    @Prop({
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: "GroupUser"
        }]
    })
    groupUser: GroupUser[];


    @Prop({
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: "Relation"
        }]
    })
    user_1: Relation[];

    @Prop({
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: "Relation"
        }]
    })
    user_2: Relation[];


    @Prop({
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: "Chat"
        }]
    })
    user_1Id: Chat[];


    @Prop({
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: "Chat"
        }]
    })
    user_2Id: Chat[];


    @Prop({
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: "Chenel"
        }]
    })
    chenel_Id: Chenel[];

    

}

export const UserSchema = SchemaFactory.createForClass(User);
