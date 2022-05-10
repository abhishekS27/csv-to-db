import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CsvtodbModule } from './csvtodb/csvtodb.module';

@Module({
  imports: [CsvtodbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
