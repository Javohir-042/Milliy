import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../users/schema/user.schema";
import { ChenelEnum } from "../../common/enum/user.enum";

export type ChenelDocument = HydratedDocument<Chenel>;

@Schema({ versionKey: false })
export class Chenel {

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    })
    user_id: User;

    @Prop()
    name: string;


    @Prop({
        type: String,
        enum: ChenelEnum,
        default: ChenelEnum.PRIVATE
    })
    status: ChenelEnum;

    @Prop()
    description: string;
}

export const chenelSchema = SchemaFactory.createForClass(Chenel);