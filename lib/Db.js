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
   * Query to get users
   *
   * @returns promise
   * @memberof Db
   */
  showUsers() {
    return new Promise((resolve, reject) => {
      Builder
        .select()
        .from('mysql.user')
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
   * Quero to get spesific user
   *
   * @param {string} user
   * @returns promise
   * @memberof Db
   */
  showUser(user) {
    return new Promise((resolve, reject) => {
      Builder
        .select()
        .from('mysql.user')
        .where('User', user)
        .first()
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
   * Query to update database config
   *
   * @param {string} name
   * @param {object} callback
   * @returns promise
   * @memberof Db
   */
  updateDatabase(name, callback) {
    return new Promise((resolve, reject) => {
      callback(dbSchema);

      const query = Db.queryBuilder();

      connector
        .mysqlQueryProcess(`ALTER DATABASE ${name} ${query}`, (results, err) => {
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
   * Query to rename database
   *
   * @param {string} name
   * @param {string} newName
   * @returns promise
   * @memberof Db
   */
  renameDatabase(name, newName) {
    return new Promise((resolve, reject) => {
      Builder
        .select(`CONCAT ('RENAME TABLE ', GROUP_CONCAT(TABLE_SCHEMA, '.', TABLE_NAME, ' TO ', '${newName}.', TABLE_NAME,' '),';') AS statement`)
        .from('INFORMATION_SCHEMA.TABLES')
        .where('TABLE_SCHEMA', name)
        .groupBy('TABLE_SCHEMA')
        .pluck('statement')
        .then((rename) => {
          Builder
            .select()
            .from('INFORMATION_SCHEMA.SCHEMATA')
            .where('SCHEMA_NAME', name)
            .first()
            .then((schema) => {
              this.createDatabase(newName, (database) => {
                database.charset(schema.DEFAULT_CHARACTER_SET_NAME);
                database.collation(schema.DEFAULT_COLLATION_NAME);
              })
                .then(() => {
                  if (!!rename.statement) {
                    connector
                      .mysqlQueryProcess(rename.statement, (results, err) => {
                        if (err) reject(err);
                        if (!err) {
                          this.dropDatabase(name)
                            .then(() => {
                              resolve();
                            })
                            .catch((errDrop) => {
                              reject(errDrop);
                            });
                        }
                      });
                  } else {
                    this.dropDatabase(name)
                      .then(() => {
                        resolve();
                      })
                      .catch((errDrop) => {
                        reject(errDrop);
                      });
                  }
                })
                .catch((err) => {
                  reject(err);
                });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * Create a new user
   *
   * @param {string} user
   * @param {string} host
   * @param {object} callback
   * @returns promise
   * @memberof Db
   */
  createUser(user, host, callback) {
    return new Promise((resolve, reject) => {
      connector.privileges = `'${user}'@'${host}'`;
      connector.queries.push(`CREATE USER '${user}'@'${host}'`);
      callback(dbSchema);
      connector.queries.push('FLUSH PRIVILEGES');

      connector.queries.forEach((query, index) => {
        connector
          .mysqlQueryProcess(query, (results, err) => {
            if (err) {
              Db.resetBindings();
              reject(err);
            }

            if (!err && connector.queries.length === (index + 1)) {
              Db.resetBindings();
              resolve();
            }
          });
      });
    });
  }

  /**
   * Update grant user
   *
   * @param {string} user
   * @param {string} host
   * @param {object} callback
   * @returns promise
   * @memberof Db
   */
  updateUser(user, host, callback) {
    return new Promise((resolve, reject) => {
      connector.privileges = `'${user}'@'${host}'`;
      callback(dbSchema);
      connector.queries.push('FLUSH PRIVILEGES');

      connector.queries.forEach((query, index) => {
        connector
          .mysqlQueryProcess(query, (results, err) => {
            if (err) {
              Db.resetBindings();
              reject(err);
            }

            if (!err && connector.queries.length === (index + 1)) {
              Db.resetBindings();
              resolve();
            }
          });
      });
    });
  }

  /**
   * Drop user
   *
   * @param {string} user
   * @param {string} host
   * @returns promise
   * @memberof Db
   */
  dropUser(user, host) {
    return new Promise((resolve, reject) => {
      connector
        .mysqlQueryProcess(`DROP USER '${user}'@'${host}'`, (results, err) => {
          if (err) reject(err);
          if (!err) resolve();
        });
    });
  }

  /**
   * Clone only database structured to a new database
   *
   * @param {string} fromDatabase
   * @param {string} toDatabase
   * @returns promise
   * @memberof Db
   */
  cloneDatabaseStructured(fromDatabase, toDatabase) {
    return new Promise((resolve, reject) => {
      Db.showCreateDatabase(fromDatabase)
        .then((createDatabaseQuery) => {
          const queryCreateDatabaseArray = createDatabaseQuery.split(' ');
          queryCreateDatabaseArray[2] = toDatabase;
          connector
            .mysqlQueryProcess(queryCreateDatabaseArray.join(' '), (results, err) => {
              if (err) reject(err);
              if (!err) {
                this.showDatabase(fromDatabase)
                  .then((tables) => {
                    tables.forEach((data, index) => {
                      connector
                        .mysqlQueryProcess(`CREATE TABLE ${toDatabase}.${data.TABLE_NAME} LIKE ${fromDatabase}.${data.TABLE_NAME}`, (resultsCreateTable, errCreateTable) => {
                          if (errCreateTable) reject(errCreateTable);
                          if (!errCreateTable && tables.length === (index + 1)) {
                            resolve();
                          }
                        });
                    });
                  })
                  .catch((errShowDatabase) => {
                    reject(errShowDatabase);
                  });
              }
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * Query to get query syntax to create like spesific database
   *
   * @static
   * @param {string} database
   * @returns promise
   * @memberof Db
   */
  static showCreateDatabase(database) {
    return new Promise((resolve, reject) => {
      connector
        .mysqlQueryProcess(`SHOW CREATE DATABASE ${database}`, (results, err) => {
          if (err) reject(err);
          if (!err) resolve(results[0]['Create Database']);
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
    connector.privileges = '';
  }
}

module.exports = new Db();
