import * as mongoose from 'mongoose';

export class DbConection {
  static _db: mongoose.Connection;
  static async changeDb(clientName: string) {
    return await DbConection._db.useDb(clientName, { useCache: true });
  }

  static async connect() {
    try {
      const db = await this.createConnection();
      console.log('Server Ready', db.connection.readyState);

      this._db = db.connection;

      process.on('SIGINT', function () {
        db.connection.close(function () {
          console.log('Mongoose disconnected on app termination');
          process.exit(0);
        });
      });
    } catch (e) {
      console.log('Error While Connecting To Server');
    }
  }
  private static async createConnection() {
    try {
      return await mongoose.connect(
        'mongodb+srv://sajan:qkU1w2NfJWHva8iH@cul-free-proj.huimb.mongodb.net/sajan?retryWrites=true&w=majority',
      );
    } catch (err) {
      console.log('Error While Connecting To Database');
    }
  }
}
