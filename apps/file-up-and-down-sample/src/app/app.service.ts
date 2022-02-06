import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to file-up-and-down-sample!' };
  }

  getFileStream() {
    return createReadStream(join(process.cwd(), 'package.json'));
  }
}
