import { Controller, Get, Post } from '@nestjs/common';
import { CsvtodbService } from './csvtodb.service';

@Controller('csvtodb')
export class CsvtodbController {
  constructor(private readonly csvtodbService: CsvtodbService) {}
  @Post()
  create(): string {
    return 'add csv to db';
  }

  @Get()
  insert() {
    this.csvtodbService.saveCsvToDb();
  }
}
