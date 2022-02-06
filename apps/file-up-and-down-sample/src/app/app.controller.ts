import {
  Controller,
  Get,
  UploadedFile,
  Post,
  StreamableFile,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import 'multer';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('post-file')
  postFile(@UploadedFile() file: Express.Multer.File) {
    return file.originalname;
  }

  @Get('streamable-file')
  getStreamableFile() {
    return new StreamableFile(this.appService.getFileStream());
  }

  // normally, `@Res()` would be a `Response` type, but I'm only interested in piping it here, so this makes the mock in the spec smaller
  @Get('res-stream') getFileViaResStream(@Res() res: NodeJS.WritableStream) {
    this.appService.getFileStream().pipe(res);
  }
}
