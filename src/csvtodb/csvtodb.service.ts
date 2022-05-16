import { Injectable } from '@nestjs/common';
import { DbConection } from '../shared/connection/dbConnection';
import { UserSchema } from './schema/user.schema';
import * as csv from 'csvtojson';

@Injectable()
export class CsvtodbService {
  async saveCsvToDb(filePath, cb) {
    try {
      const model = await this.model();
      const jsonArray = await csv().fromFile(filePath);
      await model.insertMany(jsonArray);
      return cb(null, { success: true, result: 'file uploading done' });
    } catch (err) {
      return cb({ success: false, info: 'Error While Uploading File' });
    }
  }

  async userList(skip, limit, cb) {
    try {
      const model = await this.model();
      const result = await model.find().skip(skip).limit(limit);
      return cb(null, { success: true, result: result });
    } catch (err) {
      return cb({ success: false, info: 'Error While Get Users' });
    }
  }

  async model() {
    const connection = DbConection._db;
    return connection.model('users', UserSchema);
  }
}
