import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScoreRecordDocument = ScoreRecord & Document;

@Schema()
export class ScoreRecord {
  @Prop()
  updateType: string;

  @Prop()
  username: string;

  @Prop()
  score: number;

  @Prop()
  timestamp: number;
}

export const ScoreRecordSchema = SchemaFactory.createForClass(ScoreRecord);
