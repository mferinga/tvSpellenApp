import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Presentator {
  @Prop({ required: true })
  naam!: string;

  @Prop()
  geboortedatum?: Date;

  @Prop()
  bio?: string;
}

export const PresentatorSchema = SchemaFactory.createForClass(Presentator);