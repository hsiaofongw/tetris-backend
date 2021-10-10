import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IScoreUpdate, IViewUpdate } from './interfaces';
import {
  ScoreRecord,
  ScoreRecordDocument,
} from './schemas/score-record.schema';
import { ViewRecord, ViewRecordDocument } from './schemas/view-record.schema';

export type SaveReceipt = { success: boolean; error?: any; _id?: string };

@Injectable()
export class GameLogService {
  constructor(
    @InjectModel(ViewRecord.name)
    private viewRecordModel: Model<ViewRecordDocument>,

    @InjectModel(ScoreRecord.name)
    private scoreRecordModel: Model<ScoreRecordDocument>,
  ) {}

  async addScoreUpdate(
    username: string,
    update: IScoreUpdate,
  ): Promise<ScoreRecordDocument> {
    const createdScoreRecord = new this.scoreRecordModel({
      updateType: update.updateType,
      username,
      timestamp: update.timestamp,
      score: update.payload,
    });

    return createdScoreRecord.save();
  }
}
