import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Spel {
    @Prop({required : true})
    naam! : string;

    @Prop({required : true})
    beschrijving! : string;

    @Prop({required : true})
    uitleg! : string;

    @Prop()
    orgineleNaam? : string;

    @Prop()
    teams? : boolean;
    
    @Prop()
    teamGrootte? : number;
}

export const SpelSchema = SchemaFactory.createForClass(Spel)