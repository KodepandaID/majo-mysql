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
   * @returns object
   * @memberof Schema
   */
  createTable(tableName, callback) {
    return new Promise((resolve, reject) => {
      connector.schemaBindings.statement.push('CREATE TABLE');
      connector.schemaTable = tableName;

      callback(table);

      const query = Schema.queryBuilder();
      console.log(query);
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
