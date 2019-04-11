const Builder = require('../index');
const Connector = require('./Connection/Connector');
const DbSchema = require('./Schema/Db');

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
        .catch((err) => /* istanbul ignore next */ {
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
        .catch((err) => /* istanbul ignore next */ {
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
        .catch((err) => /* istanbul ignore next */ {
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
      Connector
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
        .catch((err) => /* istanbul ignore next */ {
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
        .catch((err) => /* istanbul ignore next */ {
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
        .catch((err) => /* istanbul ignore next */ {
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
      callback(DbSchema);

      const query = Db.queryBuilder();

      Connector
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
      callback(DbSchema);

      const query = Db.queryBuilder();

      Connector
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
      callback(DbSchema);

      const query = Db.queryBuilder();

      Connector
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
      Connector
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
                    Connector
                      .mysqlQueryProcess(rename.statement, (results, err) => {
                        /* istanbul ignore if  */
                        if (err) reject(err);
                        if (!err) {
                          this.dropDatabase(name)
                            .then(() => {
                              resolve();
                            })
                            .catch((errDrop) => /* istanbul ignore next */ {
                              reject(errDrop);
                            });
                        }
                      });
                  } else {
                    this.dropDatabase(name)
                      .then(() => {
                        resolve();
                      })
                      .catch((errDrop) => /* istanbul ignore next */ {
                        reject(errDrop);
                      });
                  }
                })
                .catch((err) => /* istanbul ignore next */ {
                  reject(err);
                });
            })
            .catch((err) => /* istanbul ignore next */ {
              reject(err);
            });
        })
        .catch((err) => /* istanbul ignore next */ {
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
      Connector.connection.multipleStatements = true;
      Connector.privileges = `'${user}'@'${host}'`;

      callback(DbSchema);

      Connector.queries.push(`CREATE USER '${user}'@'${host}' ${Connector.identified}; GRANT ${Connector.grants.join(', ')} ON *.* TO '${user}'@'${host}';`);

      Connector.queries.forEach((query, index) => {
        Connector
          .mysqlQueryProcess(query, (results, err) => {
            /* istanbul ignore if  */
            if (err) {
              Db.resetBindings();
              reject(err);
            }

            if (!err && Connector.queries.length === (index + 1)) {
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
      Connector.privileges = `'${user}'@'${host}'`;

      callback(DbSchema);

      if (Connector.grants.length > 0) {
        Connector.queries.push(`GRANT ${Connector.grants.join(', ')} ON *.* TO '${user}'@'${host}';`);
      }

      Connector.queries.forEach((query, index) => {
        Connector
          .mysqlQueryProcess(query, (results, err) => {
            /* istanbul ignore if  */
            if (err) {
              Db.resetBindings();
              reject(err);
            }

            if (!err && Connector.queries.length === (index + 1)) {
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
      Connector
        .mysqlQueryProcess(`DROP USER '${user}'@'${host}'`, (results, err) => {
          /* istanbul ignore if  */
          if (err) reject(err);
          if (!err) resolve();
        });
    });
  }

  /**
   * Clone database structured and data
   *
   * @param {string} fromDatabase
   * @param {string} toDatabase
   * @returns promise
   * @memberof Db
   */
  cloneDatabase(fromDatabase, toDatabase) {
    return new Promise((resolve, reject) => {
      this.cloneDatabaseStructured(fromDatabase, toDatabase)
        .then((tables) => {
          tables.forEach((data, index) => {
            Connector
              .mysqlQueryProcess(`INSERT ${toDatabase}.${data.TABLE_NAME} SELECT * FROM ${fromDatabase}.${data.TABLE_NAME}`, (results, err) => {
                /* istanbul ignore if  */
                if (err) reject(err);
                if (!err && tables.length === (index + 1)) resolve();
              });
          });
        })
        .catch((err) => /* istanbul ignore next */ {
          reject(err);
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
          Connector
            .mysqlQueryProcess(queryCreateDatabaseArray.join(' '), (results, err) => {
              if (err) reject(err);
              if (!err) {
                this.showDatabase(fromDatabase)
                  .then((tables) => {
                    tables.forEach((data, index) => {
                      Connector
                        .mysqlQueryProcess(`CREATE TABLE ${toDatabase}.${data.TABLE_NAME} LIKE ${fromDatabase}.${data.TABLE_NAME}`, (resultsCreateTable, errCreateTable) => {
                          /* istanbul ignore if  */
                          if (errCreateTable) reject(errCreateTable);
                          if (!errCreateTable && tables.length === (index + 1)) {
                            resolve(tables);
                          }
                        });
                    });
                  })
                  .catch((errShowDatabase) => /* istanbul ignore next */ {
                    reject(errShowDatabase);
                  });
              }
            });
        })
        .catch((err) => /* istanbul ignore next */ {
          reject(err);
        });
    });
  }

  /**
   * Show all variables
   *
   * @returns promise
   * @memberof Db
   */
  showVariables() {
    return new Promise((resolve, reject) => {
      Connector
        .mysqlQueryProcess('SHOW VARIABLES;', (results, err) => {
          if (err) reject(err);
          if (!err) resolve(results);
        });
    });
  }

  /**
   * Show spesific variables
   *
   * @param {string} variable
   * @returns promise
   * @memberof Db
   */
  showVariable(variable) {
    return new Promise((resolve, reject) => {
      Connector
        .mysqlQueryProcess(`SHOW VARIABLES LIKE '${variable}';`, (results, err) => {
          if (err) reject(err);
          if (!err) resolve(results);
        });
    });
  }

  /**
   * Select all system variable and return configuration system variables
   *
   * @param {string} [global=null]
   * @param {string} [session=null]
   * @param {string} [sqlMode=null]
   * @returns promise
   * @memberof Db
   */
  selectSystemVariable(global = null, session = null, sqlMode = null) {
    return new Promise((resolve, reject) => {
      if (global === null && session === null && sqlMode === null) {
        Connector
          .mysqlQueryProcess('SELECT @@GLOBAL.sql_mode, @@SESSION.sql_mode, @@sql_mode;', (results, err) => {
            if (err) reject(err);
            if (!err) resolve(results);
          });
      } else {
        Connector
          .mysqlQueryProcess(`SELECT ${global === null ? '' : '@@GLOBAL.sql_mode'} ${session === null ? '' : '@@SESSION.sql_mode'} ${sqlMode === null ? '' : '@@sql_mode'};`, (results, err) => {
            if (err) reject(err);
            if (!err) resolve(results);
          });
      }
    });
  }

  /**
   * Set variable sql_mode
   *
   * @param {string | number} [value='TRADITIONAL']
   * @returns promise
   * @memberof Db
   */
  setSqlMode(value = 'TRADITIONAL') {
    return new Promise((resolve, reject) => {
      Connector
        .mysqlQueryProcess(`SET sql_mode = ${value}`, (results, err) => {
          if (err) reject(err);
          if (!err) resolve();
        });
    });
  }

  /**
   * Set global variable value
   *
   * @param {string} variable
   * @param {string | number} [value=DEFAULT]
   * @returns promise
   * @memberof Db
   */
  setGlobalVariable(variable, value = 'DEFAULT') {
    let tmpValue = value;
    if (typeof tmpValue === 'string' && tmpValue !== 'DEFAULT') tmpValue = `'${value}'`;

    return new Promise((resolve, reject) => {
      Connector
        .mysqlQueryProcess(`SET GLOBAL ${variable} = ${tmpValue}`, (results, err) => {
          if (err) reject(err);
          if (!err) resolve();
        });
    });
  }

  /**
   * Set local variable value
   *
   * @param {string} variable
   * @param {string | number} [value=DEFAULT]
   * @returns promise
   * @memberof Db
   */
  setLocalVariable(variable, value = 'DEFAULT') {
    let tmpValue = value;
    if (typeof tmpValue === 'string' && tmpValue !== 'DEFAULT') tmpValue = `'${value}'`;

    return new Promise((resolve, reject) => {
      Connector
        .mysqlQueryProcess(`SET LOCAL ${variable} = ${tmpValue}`, (results, err) => {
          if (err) reject(err);
          if (!err) resolve();
        });
    });
  }

  /**
   * Set session variable value
   *
   * @param {string} variable
   * @param {string | number} [value=DEFAULT]
   * @returns promise
   * @memberof Db
   */
  setSessionVariable(variable, value = 'DEFAULT') {
    let tmpValue = value;
    if (typeof tmpValue === 'string' && tmpValue !== 'DEFAULT') tmpValue = `'${value}'`;

    return new Promise((resolve, reject) => {
      Connector
        .mysqlQueryProcess(`SET SESSION ${variable} = ${tmpValue}`, (results, err) => {
          if (err) reject(err);
          if (!err) resolve();
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
      Connector
        .mysqlQueryProcess(`SHOW CREATE DATABASE ${database}`, (results, err) => {
          /* istanbul ignore if  */
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
    const query = Connector.queries.join(' ');
    return query;
  }

  /**
   * Reset all schema bindings
   *
   * @static
   * @memberof Schema
   */
  static resetBindings() {
    Connector.queries = [];
    Connector.identified = '';
    Connector.privileges = '';
    Connector.grants = [];
    Connector.connection.multipleStatements = false;
  }
}

module.exports = new Db();
