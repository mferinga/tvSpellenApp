import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Presentator {
    @Prop({required : true})
    naam! : string;

    @Prop({required : true})
    geboortedatum! : Date;

    @Prop({required : true})
    bio! : string;
}

export const PresentatorSchema = SchemaFactory.createForClass(Presentator)