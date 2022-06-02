import { Injectable } from '@nestjs/common';
import { DbConection } from '../shared/connection/dbConnection';
import { UserSchema } from './schema/user.schema';
import * as csv from 'csvtojson';
import * as fs from 'fs';

@Injectable()
export class CsvtodbService {
  async saveCsvToDb(dbName, filePath, cb) {
    try {
      const model = await this.model(dbName);
      const jsonArray = await csv().fromFile(filePath);
      await model.insertMany(jsonArray);
      await fs.unlinkSync(`${filePath}`);
      return cb(null, { success: true, result: 'file uploading done' });
    } catch (err) {
      return cb({ success: false, info: 'Error While Uploading File' });
    }
  }

  async userList(dbName, skip, limit, cb) {
    try {
      const model = await this.model(dbName);
      const result = await model.find().skip(skip).limit(limit);
      if (result.length == 0)
        return cb({ success: false, info: 'No data found' });
      return cb(null, { success: true, result: result });
    } catch (err) {
      return cb({ success: false, info: 'Error While Get Users' });
    }
  }

  async findByIdAndUpdate(dbName, id, post, cb) {
    try {
      const model = await this.model(dbName);
      const result = await model.findByIdAndUpdate(
        id,
        { $set: post },
        { new: true },
      );
      if (result == null) return cb({ success: false, info: 'No data found' });
      return cb(null, { success: true, result: result });
    } catch (err) {
      return cb({ success: false, info: 'Error While updating verify' });
    }
  }

  async model(dbName) {
    const connection = await DbConection.changeDb(dbName);
    return connection.model('users', UserSchema);
  }
}
