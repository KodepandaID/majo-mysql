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
        .catch((err) => {
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
        .catch((err) => {
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
        .catch((err) => {
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
          } else {
            resolve(false);
          }
        })
        .catch((err) => {
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
          } else {
            resolve(false);
          }
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
    const query = `${connector.schemaBindings.statement.join(' ')} ${connector.schemaConnection !== null ? `${connector.schemaConnection}.${connector.schemaTable}` : `${connector.schemaTable}`} ${connector.schemaBindings.parenthesis.length > 0 ? `(${connector.schemaBindings.parenthesis.join(', ')})` : ''} ${connector.schemaBindings.nonParenthesis.length > 0 ? `${connector.schemaBindings.nonParenthesis.join(' ')}` : ''}`;
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
    connector.schemaBindings.parenthesis = [];
    connector.schemaBindings.nonParenthesis = [];
  }
}

module.exports = new Schema();
