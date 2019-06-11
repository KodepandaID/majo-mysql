const Connector = require('./Connection/Connector');
const Table = require('./Schema/Table');

class Schema {
  /**
   * The current schema
   *
   * @param {string} schema
   * @returns this
   * @memberof Schema
   */
  withSchema(schema) {
    Connector.schemaConnection = schema;
    return this;
  }

  /**
   * Table created query
   *
   * @param {string} TableName
   * @returns object | promise
   * @memberof Schema
   */
  createTable(TableName, callback) {
    return new Promise((resolve, reject) => {
      Connector.schemaBindings.statement.push('CREATE TABLE');
      Connector.schemaTable = TableName;

      callback(Table);

      const query = Schema.queryBuilder();
      Connector
        .mysqlQueryProcess(query, (results, err) => {
          /* istanbul ignore else */
          if (!err) {
            Schema.resetBindings();
            resolve();
          } else {
            reject(err);
          }
        });
    });
  }

  /**
   * Rename Table query
   *
   * @param {string} oldTableName
   * @param {string} newTableName
   * @returns promise
   * @memberof Schema
   */
  renameTable(oldTableName, newTableName) {
    return new Promise((resolve, reject) => {
      const query = `RENAME TABLE ${oldTableName} TO ${newTableName}`;
      Connector
        .mysqlQueryProcess(query, (results, err) => {
          /* istanbul ignore else */
          if (!err) {
            resolve();
          } else {
            reject(err);
          }
        });
    });
  }

  /**
   * Drop Table query
   *
   * @param {string} TableName
   * @returns promise
   * @memberof Schema
   */
  dropTable(TableName) {
    return new Promise((resolve, reject) => {
      const query = `DROP TABLE ${TableName}`;
      Connector
        .mysqlQueryProcess(query, (results, err) => {
          /* istanbul ignore else */
          if (!err) {
            resolve();
          } else {
            reject(err);
          }
        });
    });
  }

  /**
   * Drop Table if Table is exists query
   *
   * @param {string} TableName
   * @returns promise
   * @memberof Schema
   */
  dropTableIfExists(TableName) {
    return new Promise((resolve, reject) => {
      const query = `DROP TABLE IF EXISTS ${TableName}`;
      Connector
        .mysqlQueryProcess(query, (results, err) => {
          /* istanbul ignore else */
          if (!err) {
            resolve();
          } else {
            reject(err);
          }
        });
    });
  }

  /**
   * Check spesific Table is exists or not
   *
   * @param {string} TableName
   * @returns promise
   * @memberof Schema
   */
  hasTable(TableName) {
    return new Promise((resolve, reject) => {
      const query = `SHOW TABLES LIKE '${TableName}'`;
      Connector
        .mysqlQueryProcess(query, (results, err) => {
          /* istanbul ignore else */
          if (!err) {
            /* istanbul ignore else */
            if (results.length > 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          } else {
            reject(err);
          }
        });
    });
  }

  /**
   * Check if column is exists on Table
   *
   * @param {string} TableName
   * @param {string} fieldName
   * @returns promise
   * @memberof Schema
   */
  hasColumn(TableName, fieldName) {
    return new Promise((resolve, reject) => {
      const query = `SHOW COLUMNS FROM ${TableName} LIKE '${fieldName}'`;
      Connector
        .mysqlQueryProcess(query, (results, err) => {
          /* istanbul ignore else */
          if (!err) {
            /* istanbul ignore else */
            if (results.length > 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          } else {
            reject(err);
          }
        });
    });
  }

  /**
   * ALTER TABLE QUERY
   *
   * @param {string} TableName
   * @param {object} callback
   * @returns promise
   * @memberof Schema
   */
  updateTable(TableName, callback) {
    return new Promise((resolve, reject) => {
      Connector.schemaTable = TableName;
      Connector.schemaBindings.statement.push('ALTER TABLE');

      callback(Table);
      Schema.queryBuilder();

      /* istanbul ignore else */
      if (Connector.queries.length > 0) {
        Connector.queries.forEach((query) => {
          /** Query for rename column separate from update Table
           *  cause rename column need data type
           */
          Connector
            .mysqlQueryProcess(query, (results, err) => {
              /* istanbul ignore else */
              if (!err) {
                /* istanbul ignore else */
                if (Connector.schemaBindings.renameColumn > 0) {
                  Schema.compileRenameColumn()
                    .then(() => {
                      Schema.resetBindings();
                      resolve();
                    })
                    .catch(/* istanbul ignore next */ (errRename) => {
                      Schema.resetBindings();
                      reject(errRename);
                    });
                } else {
                  Schema.resetBindings();
                  resolve();
                }
              } else {
                Schema.resetBindings();
                reject(err);
              }
            });
        });
      } else if (
        Connector.queries.length === 0 && Connector.schemaBindings.renameColumn.length > 0) {
        /** Query for rename column separate from update Table
         *  cause rename column need data type
         */
        Schema
          .compileRenameColumn()
          .then(() => {
            Schema.resetBindings();
            resolve();
          })
          .catch(/* istanbul ignore next */ (err) => {
            Schema.resetBindings();
            reject(err);
          });
      } else {
        const query = Schema.queryBuilder();
        Connector
          .mysqlQueryProcess(query, (results, err) => {
            /* istanbul ignore else */
            if (!err) {
              Schema.resetBindings();
              resolve();
            } else {
              Schema.resetBindings();
              reject(err);
            }
          });
      }
    });
  }

  analyzeTable(...args) {
    return new Promise((resolve, reject) => {
      Connector
        .mysqlQueryProcess(`ANALYZE TABLE ${args.join(', ')}`, (results, err) => {
          /* istanbul ignore if  */
          if (err) reject(err);
          else resolve(results);
        });
    });
  }

  checkTable(...args) {
    return new Promise((resolve, reject) => {
      Connector
        .mysqlQueryProcess(`CHECK TABLE ${args.join(', ')}`, (results, err) => {
          /* istanbul ignore if  */
          if (err) reject(err);
          else resolve(results);
        });
    });
  }

  checksumTable(...args) {
    return new Promise((resolve, reject) => {
      Connector
        .mysqlQueryProcess(`CHECKSUM TABLE ${args.join(', ')}`, (results, err) => {
          /* istanbul ignore if  */
          if (err) reject(err);
          else resolve(results);
        });
    });
  }

  optimizeTable(...args) {
    return new Promise((resolve, reject) => {
      Connector
        .mysqlQueryProcess(`OPTIMIZE TABLE ${args.join(', ')}`, (results, err) => {
          /* istanbul ignore if  */
          if (err) reject(err);
          else resolve(results);
        });
    });
  }

  repairTable(...args) {
    return new Promise((resolve, reject) => {
      Connector
        .mysqlQueryProcess(`REPAIR TABLE ${args.join(', ')}`, (results, err) => {
          /* istanbul ignore if  */
          if (err) reject(err);
          else resolve(results);
        });
    });
  }

  /**
   * To alter Table, used this method for compiled query ALTER TABLE with ADD
   *
   * @static
   * @returns string
   * @memberof Schema
   */
  static compileCommandAdd() {
    const arrCommand = [];
    Connector.schemaBindings.commandAdd.forEach((command) => {
      arrCommand.push(`ADD ${command}`);
    });
    return arrCommand.join(', ');
  }

  /**
   * To alter Table, used this method for compiled query ALTER TABLE with MODIFY
   *
   * @static
   * @returns string
   * @memberof Schema
   */
  static compileCommandModify() {
    const arrCommand = [];
    Connector.schemaBindings.commandModify.forEach((command) => {
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
      const { renameColumn } = Connector.schemaBindings;
      /* istanbul ignore else */
      if (renameColumn.length > 0) {
        renameColumn.forEach((command, index) => {
          const query = command.split(' ');
          Schema
            .getColumnInfo(command, query)
            .then((finalQuery) => {
              Connector
                .mysqlQueryProcess(finalQuery, (results, err) => {
                  /* istanbul ignore else */
                  if (!err) {
                    /* istanbul ignore else */
                    if (renameColumn.length === (index + 1)) {
                      Connector.schemaBindings.renameColumn = [];
                      resolve();
                    }
                  } else {
                    reject(err);
                  }
                });
            })
            .catch(/* istanbul ignore next */ (err) => {
              reject(err);
            });
        });
      } else {
        resolve();
      }
    });
  }

  /**
   * Query use to get column info from database Table
   *
   * @static
   * @param {string} command
   * @param {array} query
   * @returns promise
   * @memberof Schema
   */
  static getColumnInfo(command, query) {
    return new Promise((resolve, reject) => {
      Connector
        .mysqlQueryProcess(`SHOW FIELDS FROM ${query[2]} LIKE '${query[5]}'`, (results, err) => {
          /* istanbul ignore else */
          if (!err) {
            const fieldType = results[0].Type;
            const fieldNull = `${results[0].Null === 'NO' ? 'NOT NULL' : 'NULL'}`;
            const fieldDefault = `${results[0].Default === '' || results[0].Default === null ? '' : `DEFAULT ${typeof results[0].Default === 'string' && results[0].Default !== 'CURRENT_TIMESTAMP' ? `'${results[0].Default}'` : results[0].Default}`}`;
            const fieldExtra = `${results[0].Extra === '' ? '' : results[0].Extra}`;

            resolve(`${command} ${fieldType} ${fieldNull} ${fieldDefault} ${fieldExtra}`);
          } else {
            reject(err);
          }
        });
    });
  }

  /**
   * Compile query Table
   *
   * @static
   * @returns string query
   * @memberof Table
   */
  static queryBuilder() {
    const toSchema = `${Connector.schemaConnection !== null ? `${Connector.schemaConnection}.${Connector.schemaTable}` : `${Connector.schemaTable}`}`;

    let commandQuery = '';
    if (Connector.schemaBindings.statement[0] === 'CREATE TABLE') {
      commandQuery = `(${Connector.schemaBindings.commandAdd.join(', ')})`;
    }

    const commandAdd = Schema.compileCommandAdd();
    const commandModify = Schema.compileCommandModify();
    if (Connector.schemaBindings.statement[0] === 'ALTER TABLE') {
      if (commandAdd !== '') {
        Connector.queries.push(`ALTER TABLE ${toSchema} ${commandAdd}`);
      }

      if (commandModify !== '') {
        Connector.queries.push(`ALTER TABLE ${toSchema} ${commandModify}`);
      }
    }

    let query = '';
    if (commandAdd !== '' || commandModify !== '' || Connector.schemaBindings.config.length > 0) {
      query = `${Connector.schemaBindings.statement.join(' ')} ${toSchema} ${commandQuery} ${Connector.schemaBindings.config.join(' ')}`;
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
    Connector.schemaConnection = null;
    Connector.schemaTable = null;
    Connector.schemaBindings.statement = [];
    Connector.schemaBindings.commandAdd = [];
    Connector.schemaBindings.commandModify = [];
    Connector.schemaBindings.renameColumn = [];
    Connector.schemaBindings.config = [];
    Connector.queries = [];
  }
}

module.exports = new Schema();
