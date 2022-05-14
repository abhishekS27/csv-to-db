import { Injectable } from '@nestjs/common';
import { DbConection } from '../shared/connection/dbConnection';
import { UserSchema } from './schema/user.schema';
import * as csv from 'csvtojson';

@Injectable()
export class CsvtodbService {
  async saveCsvToDb(filePath, cb) {
    try {
      const connection = DbConection._db;
      const userModel = await connection.model('users', UserSchema);
      const jsonArray = await csv().fromFile(filePath);
      await userModel.insertMany(jsonArray);
      return cb(null, { success: true, result: 'file uploading done' });
    } catch (err) {
      return cb({ success: false, info: 'Error While Uploading File' });
    }
  }

  async getAllData() {
    const connection = DbConection._db;
    const userModel = await connection.model('users', UserSchema);
    return await userModel.find();
  }
}
