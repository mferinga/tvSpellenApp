import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Spel {
  @Prop({ required: true })
  naam!: string;

  @Prop({ required: true })
  beschrijving!: string;

  @Prop({ required: true })
  uitleg!: string;

  @Prop()
  originleNaam?: string;

  @Prop()
  teams?: boolean;

  @Prop()
  teamgrootte?: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Presentator' }], default: [] })
  presentators!: Types.ObjectId[];
}

export const SpelSchema = SchemaFactory.createForClass(Spel);