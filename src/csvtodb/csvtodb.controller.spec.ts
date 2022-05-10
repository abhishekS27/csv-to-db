import { Test, TestingModule } from '@nestjs/testing';
import { CsvtodbController } from './csvtodb.controller';

describe('CsvtodbController', () => {
  let controller: CsvtodbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CsvtodbController],
    }).compile();

    controller = module.get<CsvtodbController>(CsvtodbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
