import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { CsvtodbService } from './csvtodb.service';
import * as multer from 'multer';

@Controller('csvtodb')
export class CsvtodbController {
  constructor(private readonly csvtodbService: CsvtodbService) {}

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.csvtodbService.saveCsvToDb(files[0].path);
  }
}
