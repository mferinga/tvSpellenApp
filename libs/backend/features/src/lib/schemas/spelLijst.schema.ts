import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Spellijst {
  @Prop({ required: true })
  naam!: string;

  @Prop()
  beschrijving?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Spel' }], default: [] })
  spellen!: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  spelleider!: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  spelers!: Types.ObjectId[];
}

export const SpellijstSchema = SchemaFactory.createForClass(Spellijst);