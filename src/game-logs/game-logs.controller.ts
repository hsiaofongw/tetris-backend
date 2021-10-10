import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ScoreLogCreateDto, ViewLogCreateDto } from './game-log-create.dto';
import { GameLogService } from './game-logs.service';
import { ScoreRecordDocument } from './schemas/score-record.schema';
import { ViewRecordDocument } from './schemas/view-record.schema';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('game-log')
export class GameLogController {
  constructor(private gameLogsService: GameLogService) {}

  @Post('score')
  async postScoreUpdate(
    @Req() req: any,
    @Body() payload: ScoreLogCreateDto,
  ): Promise<ScoreRecordDocument> {
    const username = req.user?.result?.username ?? 'unknownUser';

    const receipt = await this.gameLogsService.addScoreUpdate(username, {
      updateType: 'scoreUpdate',
      timestamp: payload.timestamp,
      payload: payload.score,
    });

    return receipt;
  }
}
