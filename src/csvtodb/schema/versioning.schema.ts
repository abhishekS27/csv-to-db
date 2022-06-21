import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const VersionSchema = new Schema(
  {},
  { strict: false, versionKey: false },
);
