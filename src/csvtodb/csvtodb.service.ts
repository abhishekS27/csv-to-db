import { Injectable } from '@nestjs/common';
import { DbConection } from '../shared/connection/dbConnection';
import { UserSchema } from './schema/user.schema';
import * as csv from 'csvtojson';

@Injectable()
export class CsvtodbService {
  async saveCsvToDb(filePath) {
    const conn = DbConection._db;
    const userModel = await conn.model('users', UserSchema);
    const jsonArray = await csv().fromFile(filePath);
    await userModel.insertMany(jsonArray);
    return 'file uploading done';
  }
}
