import { ApiProperty } from '@nestjs/swagger';
import { IBoard, ICell, IPoint } from './interfaces';

export class ScoreLogCreateDto {
  @ApiProperty({ description: 'Latest score', example: 100 })
  score: number;

  @ApiProperty({ description: 'Timestamp' })
  timestamp: number;
}

export class PointCreateDto implements IPoint {
  @ApiProperty({ description: 'Point X projection' })
  offsetX: number;

  @ApiProperty({ description: 'Point Y projection' })
  offsetY: number;
}

export class CellCreateDto implements ICell {
  @ApiProperty({ description: 'Id of cell' })
  id: string;

  @ApiProperty({ description: 'Point' })
  point: PointCreateDto;
}

export class BoardCreateDto implements IBoard {
  @ApiProperty({ description: 'Number of rows' })
  nRows: number;

  @ApiProperty({ description: 'Number of cols' })
  nCols: number;

  @ApiProperty({ description: 'States of cells', type: [CellCreateDto] })
  cells: CellCreateDto[];
}

export class ViewLogCreateDto {
  @ApiProperty({ description: 'Board state' })
  board: BoardCreateDto;

  @ApiProperty({ description: 'Timestamp' })
  timestamp: number;
}
