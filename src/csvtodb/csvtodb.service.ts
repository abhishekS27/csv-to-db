import { Injectable } from '@nestjs/common';
import { DbConection } from '../shared/connection/dbConnection';
import { UserSchema } from './schema/user.schema';
import { VersionSchema } from './schema/versioning.schema';
import * as csv from 'csvtojson';
import * as fs from 'fs';

@Injectable()
export class CsvtodbService {
  async saveCsvToDb(dbName, filePath, cb) {
    try {
      const model = await this.model(dbName);
      const jsonArray = await csv().fromFile(filePath);
      const uniCodeAddedJsonArray = this.addUniCode(jsonArray);
      await model.insertMany(uniCodeAddedJsonArray);
      await fs.unlinkSync(`${filePath}`);
      return cb(null, { success: true, result: 'file uploading done' });
    } catch (err) {
      return cb({ success: false, info: 'Error While Uploading File' });
    }
  }

  addUniCode(jsonArray) {
    const unicodeAddedJsonArray = [];
    for (let i = 0; i < jsonArray.length; i++) {
      const element = jsonArray[i];
      element['unicode'] = this.randomUniCodeGenerator();
      unicodeAddedJsonArray.push(element);
    }
    return unicodeAddedJsonArray;
  }

  randomUniCodeGenerator() {
    const chars = this.shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))
      .join('')
      .slice(0, 3);
    const number = this.shuffle('0123456789'.split('')).join('').slice(0, 3);
    return chars + number;
  }

  shuffle(o) {
    for (
      let j, x, i = o.length;
      i;
      j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
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

  async updateVersion(dbName, id, body, cb) {
    try {
      const model = await this.model(dbName);
      body['__v']++;
      const result = await model.findByIdAndUpdate(id, { $set: body }).lean();
      result['parentId'] = result['_id'];
      delete result['_id'];
      const versioningModel = await this.model(dbName, 'versioning');
      const doc = new versioningModel(result);
      const create = await doc.save();
      if (result == null) return cb({ success: false, info: 'No data found' });
      return cb(null, { success: true, result: create });
    } catch (err) {
      return cb({ success: false, info: 'Error While updating verify' });
    }
  }

  async model(dbName, collectionName?) {
    const connection = await DbConection.changeDb(dbName);
    if (collectionName) {
      return connection.model(collectionName, VersionSchema);
    } else {
      return connection.model('users', UserSchema);
    }
  }
}
