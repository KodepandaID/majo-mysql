const connector = require('./Connection/Connector');
const dbSchema = require('./Schema/Db');

class Db {
  /**
   * Create new database
   *
   * @param {string} name
   * @param {object} callback
   * @returns promise
   * @memberof Db
   */
  createDatabase(name, callback) {
    return new Promise((resolve, reject) => {
      callback(dbSchema);

      const query = Db.queryBuilder();

      connector
        .mysqlQueryProcess(`CREATE DATABASE ${name} ${query}`, (results, err) => {
          /* istanbul ignore else */
          if (!err) {
            Db.resetBindings();
            resolve();
          } else {
            Db.resetBindings();
            reject(err);
          }
        });
    });
  }

  /**
   * Create new database if no exists
   *
   * @param {string} name
   * @param {object} callback
   * @returns promise
   * @memberof Db
   */
  createDatabaseIfNotExists(name, callback) {
    return new Promise((resolve, reject) => {
      callback(dbSchema);

      const query = Db.queryBuilder();

      connector
        .mysqlQueryProcess(`CREATE DATABASE IF NOT EXISTS ${name} ${query}`, (results, err) => {
          /* istanbul ignore else */
          if (!err) {
            Db.resetBindings();
            resolve();
          } else {
            Db.resetBindings();
            reject(err);
          }
        });
    });
  }

  /**
   * Drop database
   *
   * @param {string} name
   * @returns promise
   * @memberof Db
   */
  dropDatabase(name) {
    return new Promise((resolve, reject) => {
      connector
        .mysqlQueryProcess(`DROP DATABASE ${name}`, (results, err) => {
          /* istanbul ignore else */
          if (!err) {
            Db.resetBindings();
            resolve();
          } else {
            Db.resetBindings();
            reject(err);
          }
        });
    });
  }

  /**
   * Query builder
   *
   * @static
   * @returns string
   * @memberof Db
   */
  static queryBuilder() {
    const query = connector.queries.join(' ');
    return query;
  }

  /**
   * Reset all schema bindings
   *
   * @static
   * @memberof Schema
   */
  static resetBindings() {
    connector.queries = [];
  }
}

module.exports = new Db();
