import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../users/schema/user.schema";

export type RelationDocument = HydratedDocument<Relation>;

@Schema({ versionKey: false })
export class Relation {
    @Prop()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user_1: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user_2: string;

}

export const RelationSchema = SchemaFactory.createForClass(Relation);