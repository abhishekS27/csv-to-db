import {
  Controller,
  Get,
  Headers,
  Patch,
  Post,
  Query,
  UseInterceptors,
  Param,
  Body,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvtodbService } from './csvtodb.service';

@Controller('csvtodb')
export class CsvtodbController {
  constructor(private readonly csvtodbService: CsvtodbService) {}

  @Get()
  async user(
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
  @UseInterceptors(FileInterceptor('data'))
  async uploadFile(
    @Headers('subdomain') dbName,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!dbName) return 'Kindly provide subdomain';
    if (file.mimetype != 'text/csv') return 'kindly provide csv';
    return this.csvtodbService.saveCsvToDb(
      dbName,
      file.path,
      function (err, result) {
        if (err) return err;
        return result;
      },
    );
  }

  @Patch(':id')
  async verify(@Headers('subdomain') dbName, @Param() { id }, @Body() post) {
    if (!dbName) return 'Kindly provide subdomain';
    return this.csvtodbService.findByIdAndUpdate(
      dbName,
      id,
      post,
      function (err, result) {
        if (err) return err;
        return result;
      },
    );
  }

  @Put(':id')
  async update(@Headers('subdomain') dbName, @Param() { id }, @Body() post) {
    if (!dbName) return 'Kindly provide subdomain';
    return this.csvtodbService.updateVersion(
      dbName,
      id,
      post,
      function (err, result) {
        if (err) return err;
        return result;
      },
    );
  }
}
