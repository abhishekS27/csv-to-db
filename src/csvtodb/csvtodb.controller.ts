import {
  Controller,
  Get,
  Headers,
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
  user(
    @Query('skip') skip,
    @Query('limit') limit,
    @Headers('subdomain') dbName,
  ) {
    if ((skip == 0 && limit == 0) || skip > limit)
      return 'Skip is not equal to limit and greater than limit';
    if (!dbName) return 'Kindly provide subdomain';
    return this.csvtodbService.userList(
      dbName,
      skip,
      limit,
      (err: any, result: any) => {
        if (err) return err;
        return result;
      },
    );
  }

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(
    @Headers('subdomain') dbName,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    if (!dbName) return 'Kindly provide subdomain';
    console.log(dbName, files);
    return this.csvtodbService.saveCsvToDb(
      dbName,
      files[0].path,
      function (err, result) {
        if (err) return err;
        return result;
      },
    );
  }
}
