import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameLogController } from './game-logs.controller';
import { GameLogService } from './game-logs.service';
import { ScoreRecord, ScoreRecordSchema } from './schemas/score-record.schema';
import { ViewRecord, ViewRecordSchema } from './schemas/view-record.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ScoreRecord.name, schema: ScoreRecordSchema },
      { name: ViewRecord.name, schema: ViewRecordSchema },
    ]),
  ],
  providers: [GameLogService],
  controllers: [GameLogController],
})
export class GameLogsModule {}
