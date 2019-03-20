const Builder = require('../index');
const connector = require('./Connection/Connector');
const dbSchema = require('./Schema/Db');

class Db {
  /**
   * Query to show all database with information
   *
   * @returns promise
   * @memberof Db
   */
  showDatabases() {
    return new Promise((resolve, reject) => {
      Builder
        .select()
        .from('INFORMATION_SCHEMA.SCHEMATA')
        .get()
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * Query to show spesific database
   *
   * @param {string} database
   * @returns promise
   * @memberof Db
   */
  showDatabase(database) {
    return new Promise((resolve, reject) => {
      Builder
        .select()
        .from('INFORMATION_SCHEMA.TABLES')
        .where('TABLE_SCHEMA', database)
        .get()
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * Query to get information from spesific database
   *
   * @param {string} database
   * @returns promise
   * @memberof Db
   */
  showDatabaseInfo(database) {
    return new Promise((resolve, reject) => {
      Builder
        .select()
        .from('INFORMATION_SCHEMA.SCHEMATA')
        .where('SCHEMA_NAME', database)
        .get()
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * Query to show column information from spesific database table
   *
   * @param {string} database
   * @param {string} table
   * @returns this
   * @memberof Db
   */
  showColumn(database, table) {
    return new Promise((resolve, reject) => {
      connector
        .mysqlQueryProcess(`SHOW FULL COLUMNS FROM ${database}.${table}`, (results, err) => {
          /* istanbul ignore else */
          if (!err) {
            resolve(results);
          } else {
            reject(err);
          }
        });
    });
  }

  /**
   * Query to get indexes from spesific database
   *
   * @param {string} database
   * @returns promise
   * @memberof Db
   */
  showIndexes(database) {
    return new Promise((resolve, reject) => {
      Builder
        .select()
        .from('INFORMATION_SCHEMA.STATISTICS')
        .where('TABLE_SCHEMA', database)
        .get()
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

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
