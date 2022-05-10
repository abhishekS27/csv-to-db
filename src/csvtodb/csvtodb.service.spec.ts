import { Test, TestingModule } from '@nestjs/testing';
import { CsvtodbService } from './csvtodb.service';

describe('CsvtodbService', () => {
  let service: CsvtodbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsvtodbService],
    }).compile();

    service = module.get<CsvtodbService>(CsvtodbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
