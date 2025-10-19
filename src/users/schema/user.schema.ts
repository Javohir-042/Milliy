import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Gender } from '../../common/enum/user.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true })
export class User {
    @Prop({ required: true})
    name: string;

    @Prop({ required: true})
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

    @Prop({ required: true})
    password: string;

    @Prop({ required: true })
    protection: string;

    @Prop({ default: true })
    is_active: boolean;

    @Prop({ default: false })
    is_verified: boolean;

    @Prop({ default: null })
    refresh_token?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
