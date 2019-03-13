const connector = require('./Connection/Connector');
const table = require('./Schema/Table');

class Schema {
  /**
   * The current schema
   *
   * @param {string} schema
   * @returns this
   * @memberof Schema
   */
  withSchema(schema) {
    connector.schemaConnection = schema;
    return this;
  }

  /**
   * Table created query
   *
   * @param {string} tableName
   * @returns object | promise
   * @memberof Schema
   */
  createTable(tableName, callback) {
    return new Promise((resolve, reject) => {
      connector.schemaBindings.statement.push('CREATE TABLE');
      connector.schemaTable = tableName;

      callback(table);

      const query = Schema.queryBuilder();
      connector
        .mysqlQueryProcess(query)
        .then(() => {
          Schema.resetBindings();
          resolve();
        })
        .catch((err) => /* istanbul ignore next */ {
          Schema.resetBindings();
          reject(err);
        });
    });
  }

  /**
   * Rename table query
   *
   * @param {string} oldTableName
   * @param {string} newTableName
   * @returns promise
   * @memberof Schema
   */
  renameTable(oldTableName, newTableName) {
    return new Promise((resolve, reject) => {
      const query = `RENAME TABLE ${oldTableName} TO ${newTableName}`;
      connector
        .mysqlQueryProcess(query)
        .then(() => {
          resolve();
        })
        .catch((err) => /* istanbul ignore next */ {
          reject(err);
        });
    });
  }

  /**
   * Drop table query
   *
   * @param {string} tableName
   * @returns promise
   * @memberof Schema
   */
  dropTable(tableName) {
    return new Promise((resolve, reject) => {
      const query = `DROP TABLE ${tableName}`;
      connector
        .mysqlQueryProcess(query)
        .then(() => {
          resolve();
        })
        .catch((err) => /* istanbul ignore next */ {
          reject(err);
        });
    });
  }

  /**
   * Drop table if table is exists query
   *
   * @param {string} tableName
   * @returns promise
   * @memberof Schema
   */
  dropTableIfExists(tableName) {
    return new Promise((resolve, reject) => {
      const query = `DROP TABLE IF EXISTS ${tableName}`;
      connector
        .mysqlQueryProcess(query)
        .then(() => {
          resolve();
        })
        .catch((err) => /* istanbul ignore next */ {
          reject(err);
        });
    });
  }

  /**
   * Check spesific table is exists or not
   *
   * @param {string} tableName
   * @returns promise
   * @memberof Schema
   */
  hasTable(tableName) {
    return new Promise((resolve, reject) => {
      const query = `SHOW TABLES LIKE '${tableName}'`;
      connector
        .mysqlQueryProcess(query)
        .then((results) => {
          if (results.length > 0) {
            resolve(true);
          } else /* istanbul ignore else */ {
            resolve(false);
          }
        })
        .catch((err) => /* istanbul ignore next */ {
          reject(err);
        });
    });
  }

  /**
   * Check if column is exists on table
   *
   * @param {string} tableName
   * @param {string} fieldName
   * @returns promise
   * @memberof Schema
   */
  hasColumn(tableName, fieldName) {
    return new Promise((resolve, reject) => {
      const query = `SHOW COLUMNS FROM ${tableName} LIKE '${fieldName}'`;
      connector
        .mysqlQueryProcess(query)
        .then((results) => {
          if (results.length > 0) {
            resolve(true);
          } else /* istanbul ignore else */ {
            resolve(false);
          }
        })
        .catch((err) => /* istanbul ignore next */ {
          reject(err);
        });
    });
  }

  /**
   * ALTER TABLE QUERY
   *
   * @param {string} tableName
   * @param {object} callback
   * @returns promise
   * @memberof Schema
   */
  updateTable(tableName, callback) {
    return new Promise(async (resolve, reject) => {
      connector.schemaTable = tableName;
      connector.schemaBindings.statement.push('ALTER TABLE');

      callback(table);

      const alterQuery = Schema.queryBuilder();
      if (alterQuery !== '') {
        connector.queries.push(alterQuery);
      }

      if (connector.queries.length > 0) {
        connector.queries.forEach((query, index) => {
          if (connector.queries.length >= (index + 1)) {
            connector
              .mysqlQueryProcess(query)
              .then(() => {
                /** Query for rename column separate from update table
                 *  cause rename column need data type
                 */
                Schema.compileRenameColumn()
                  .then(() => {
                    resolve();
                  })
                  .catch((err) => /* istanbul ignore next */ {
                    Schema.resetBindings();
                    reject(err);
                  });
              })
              .catch((err) => /* istanbul ignore next */ {
                Schema.resetBindings();
                reject(err);
              });
          }
        });
      } else {
        /** Query for rename column separate from update table
         *  cause rename column need data type
         */
        Schema.compileRenameColumn()
          .then(() => {
            resolve();
          })
          .catch((err) => /* istanbul ignore next */ {
            Schema.resetBindings();
            reject(err);
          });
      }
    });
  }

  /**
   * To alter table, used this method for compiled query ALTER TABLE with ADD
   *
   * @static
   * @returns string
   * @memberof Schema
   */
  static compileCommandAdd() {
    const arrCommand = [];
    connector.schemaBindings.commandAdd.forEach((command) => {
      arrCommand.push(`ADD ${command}`);
    });
    return arrCommand.join(', ');
  }

  /**
   * To alter table, used this method for compiled query ALTER TABLE with MODIFY
   *
   * @static
   * @returns string
   * @memberof Schema
   */
  static compileCommandModify() {
    const arrCommand = [];
    connector.schemaBindings.commandModify.forEach((command) => {
      arrCommand.push(`MODIFY ${command}`);
    });
    return arrCommand.join(', ');
  }

  /**
   * Build query for rename column from old column name to
   * new column name
   *
   * @static
   * @returns promise
   * @memberof Schema
   */
  static compileRenameColumn() {
    return new Promise((resolve, reject) => {
      if (connector.schemaBindings.renameColumn.length > 0) {
        connector.schemaBindings.renameColumn.forEach((command, index) => {
          const query = command.split(' ');
          Schema
            .getColumnInfo(command, query)
            .then((finalQuery) => {
              connector
                .mysqlQueryProcess(finalQuery)
                .then(() => {
                  if (connector.schemaBindings.renameColumn.length === (index + 1)) {
                    resolve();
                  }
                })
                .catch((err) => /* istanbul ignore next */ {
                  reject(err);
                });
            })
            .catch((err) => /* istanbul ignore next */ {
              reject(err);
            });
        });
      } else {
        resolve();
      }
      Schema.resetBindings();
    });
  }

  /**
   * Query use to get column info from database table
   *
   * @static
   * @param {string} command
   * @param {array} query
   * @returns promise
   * @memberof Schema
   */
  static getColumnInfo(command, query) {
    return new Promise((resolve, reject) => {
      connector
        .mysqlQueryProcess(`SHOW FIELDS FROM ${query[2]} LIKE '${query[5]}'`)
        .then((results) => {
          const fieldType = results[0].Type;
          const fieldNull = `${results[0].Null === 'NO' ? 'NOT NULL' : 'NULL'}`;
          const fieldDefault = `${results[0].Default === '' || results[0].Default === null ? '' : `DEFAULT = ${typeof results[0].Default === 'string' ? `'${results[0].Default}'` : results[0].Default}`}`;
          const fieldExtra = `${results[0].Extra === '' ? '' : results[0].Extra}`;

          resolve(`${command} ${fieldType} ${fieldNull} ${fieldDefault} ${fieldExtra}`);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * Compile query table
   *
   * @static
   * @returns string query
   * @memberof Table
   */
  static queryBuilder() {
    const toSchema = `${connector.schemaConnection !== null ? `${connector.schemaConnection}.${connector.schemaTable}` : `${connector.schemaTable}`}`;

    let commandQuery = '';
    if (connector.schemaBindings.statement[0] === 'CREATE TABLE') {
      commandQuery = `(${connector.schemaBindings.commandAdd.join(', ')})`;
    }

    const commandAdd = Schema.compileCommandAdd();
    const commandModify = Schema.compileCommandModify();
    if (connector.schemaBindings.statement[0] === 'ALTER TABLE') {
      if (commandAdd !== '') {
        connector.queries.push(`ALTER TABLE ${toSchema} ${commandAdd}`);
      }

      if (commandModify !== '') {
        connector.queries.push(`ALTER TABLE ${toSchema} ${commandModify}`);
      }
    }

    let query = '';
    if (commandAdd !== '' || commandModify !== '') {
      query = `${connector.schemaBindings.statement.join(' ')} ${toSchema} ${commandQuery} ${connector.schemaBindings.config.length > 0 ? connector.schemaBindings.config.join(' ') : ''}`;
    }
    return query;
  }

  /**
   * Reset all schema bindings
   *
   * @static
   * @memberof Schema
   */
  static resetBindings() {
    connector.schemaConnection = null;
    connector.schemaTable = null;
    connector.schemaBindings.statement = [];
    connector.schemaBindings.commandAdd = [];
    connector.schemaBindings.commandModify = [];
    connector.schemaBindings.config = [];
    connector.queries = [];
  }
}

module.exports = new Schema();
