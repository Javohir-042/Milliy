
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Region } from '../../region/schema/region.schema';

export type DistrictDocument = HydratedDocument<District>;

@Schema({ versionKey: false})
export class District {
    @Prop()
    name: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "Region"
    })
    regionId: Region;


}

export const DistrictSchema = SchemaFactory.createForClass(District);