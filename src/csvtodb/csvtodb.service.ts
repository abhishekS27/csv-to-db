import { Injectable } from '@nestjs/common';
import { DbConection } from '../shared/connection/dbConnection';
import { UserSchema } from './schema/user.schema';
import * as csv from 'csvtojson';

@Injectable()
export class CsvtodbService {
  async saveCsvToDb(filePath, cb) {
    try {
      const conn = DbConection._db;
      const userModel = await conn.model('users', UserSchema);
      const jsonArray = await csv().fromFile(filePath);
      await userModel.insertMany(jsonArray);
      return cb(null, { success: true, result: 'file uploading done' });
    } catch (err) {
      return cb({ success: false, info: 'Error While Uploading File' });
    }
  }
}
