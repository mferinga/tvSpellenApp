import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class Spellijst {
    @Prop({required : true})
    naam! : string;

    @Prop({required : true})
    aangemaaktOp! : Date;

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true
    })
    userId!: Types.ObjectId;
}

export const SpelLijstSchema = SchemaFactory.createForClass(Spellijst)