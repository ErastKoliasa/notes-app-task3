import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: false })
  archived: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
