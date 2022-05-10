import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer';
import { CsvtodbController } from './csvtodb.controller';
import { CsvtodbService } from './csvtodb.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [CsvtodbController],
  providers: [CsvtodbService],
})
export class CsvtodbModule {}
