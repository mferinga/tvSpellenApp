import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRol {
  ADMIN = 'admin',
  SPELLEIDER = 'spelleider',
  SPELER = 'speler',
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  naam!: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email!: string;

  @Prop({ required: true })
  wachtwoordHash!: string;

  @Prop({
    type: String,
    enum: Object.values(UserRol),
    default: UserRol.SPELER,
  })
  rol!: UserRol;
}

export const UserSchema = SchemaFactory.createForClass(User);
