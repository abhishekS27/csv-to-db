import { Module } from '@nestjs/common';
import { CsvtodbController } from './csvtodb.controller';
import { CsvtodbService } from './csvtodb.service';

@Module({
  controllers: [CsvtodbController],
  providers: [CsvtodbService],
})
export class CsvtodbModule {}
