
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../../common/enum/user.enum';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ versionKey: false, timestamps: true})
export class Admin {
    @Prop()
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    phone: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: true })
    is_active: boolean


    @Prop({ default: false })
    is_creator: boolean

    @Prop({ enum: Role, default: Role.ADMIN })
    role: Role;


    @Prop()
    refresh_token: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);