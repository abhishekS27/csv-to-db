import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CsvtodbService } from './csvtodb.service';

@Controller('csvtodb')
export class CsvtodbController {
  constructor(private readonly csvtodbService: CsvtodbService) {}

  @Get()
  user(@Query('skip') skip, @Query('limit') limit) {
    if ((skip == 0 && limit == 0) || skip > limit)
      return 'Skip is not equal to limit and greater than limit';
    return this.csvtodbService.userList(skip, limit, (err, result) => {
      if (err) return err;
      return result;
    });
  }

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.csvtodbService.saveCsvToDb(
      files[0].path,
      function (err, result) {
        if (err) return err;
        return result;
      },
    );
  }
}
