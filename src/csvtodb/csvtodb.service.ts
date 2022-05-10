import { Injectable } from '@nestjs/common';
import { DbConection } from '../shared/connection/dbConnection';
import { UserSchema } from './schema/user.schema';
import * as csv from 'csvtojson';

@Injectable()
export class CsvtodbService {
  async saveCsvToDb() {
    const conn = DbConection._db;
    const userModel = await conn.model('users', UserSchema);
    const csvFilePath = 'data.csv';
    const jsonArray = await csv().fromFile(csvFilePath);
    await userModel.insertMany(jsonArray);
    console.log('done');
  }
}
