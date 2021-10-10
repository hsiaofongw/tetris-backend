import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type ViewRecordDocument = ViewRecord & Document;

@Schema()
class Point {
  @Prop()
  offsetX: number;

  @Prop()
  offsetY: number;
}

@Schema()
class Cell {
  @Prop()
  id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Point' })
  point: Point;
}

@Schema()
class Board {
  @Prop()
  nRows: number;

  @Prop()
  nCols: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cell' }] })
  cells: Cell[];
}

@Schema()
export class ViewRecord {
  @Prop()
  updateType: string;

  @Prop()
  username: string;

  @Prop()
  timestamp: number;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Board' })
  // board: Board;

  @Prop()
  boardJSON: string;
}

export const ViewRecordSchema = SchemaFactory.createForClass(ViewRecord);
