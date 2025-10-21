import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type GroupUserDocument = HydratedDocument<GroupUser>;

@Schema({ versionKey: false })
export class GroupUser {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true,
    })
    groupId: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    })
    userId: string;
}

export const GroupUserSchema = SchemaFactory.createForClass(GroupUser);
