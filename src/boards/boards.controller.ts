import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsService } from './boards.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }
}
// @Controller('boards')
// export class BoardsController {
//   constructor(private boardsService: BoardsService) {}

//   @Get('/')
//   getAllBoard(): Board[] {
//     return this.boardsService.getAllBoards();
//   }

//   // DTO 사용 전
//   // @Post('/')
//   // createBoard(
//   //   @Body('title') title: string,
//   //   @Body('description') description: string,
//   // ): Board {
//   //   return this.boardsService.createBoard(title, description);
//   // }

//   // DTO 사용 후
//   @Post('/')
//   @UsePipes(ValidationPipe)
//   createBoard(@Body() createBoardDto: CreateBoardDto): Board {
//     return this.boardsService.createBoard(createBoardDto);
//   }

//   @Get('/:id')
//   getBoardById(@Param('id') id: string): Board {
//     return this.boardsService.getBoardById(id);
//   }

//   @Delete('/:id')
//   deleteBoard(@Param('id') id: string): void {
//     this.boardsService.deleteBoard(id);
//   }

//   @Patch('/:id/status')
//   updateBoardStatus(
//     @Param('id') id: string,
//     @Body('status', BoardStatusValidationPipe) status: BoardStatus,
//   ): Board {
//     return this.boardsService.updateBoardStatus(id, status);
//   }
// }
