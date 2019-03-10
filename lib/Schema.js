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
  createTable(tableName) {
    connector.schemaBindings.statement.push('CREATE TABLE');
    connector.schemaTable = tableName;
    return table;
  }
}

module.exports = new Schema();
