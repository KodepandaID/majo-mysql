const connector = require('./Connection/Connector');
const TriggerSchema = require('./Schema/Trigger');

class Trigger {
  /**
   * Show all trigger list
   *
   * @param {string} database
   * @returns promise
   * @memberof Trigger
   */
  showTriggers(database) {
    return new Promise((resolve, reject) => {
      connector
        .mysqlQueryProcess(`SHOW TRIGGERS FROM ${database}`, (results, err) => {
          if (err) reject(err);
          if (!err) resolve(results);
        });
    });
  }

  /**
   * Show spesific trigger
   *
   * @param {string} database
   * @param {string} triggerName
   * @returns promise
   * @memberof Trigger
   */
  showTrigger(database, triggerName) {
    return new Promise((resolve, reject) => {
      connector
        .mysqlQueryProcess(`SHOW TRIGGERS FROM ${database} WHERE \`Trigger\` = '${triggerName}'`, (results, err) => {
          if (err) reject(err);
          if (!err) resolve(results[0]);
        });
    });
  }

  /**
   * Query to create a new trigger with action before insert
   *
   * @param {string} table
   * @param {string} triggerTable
   * @param {object} callback
   * @returns promise
   * @memberof Trigger
   */
  createBeforeInsert(table, triggerTable, callback) {
    return new Promise((resolve, reject) => {
      connector.queries.push(`CREATE TRIGGER before_${triggerTable}_insert BEFORE INSERT ON ${triggerTable} FOR EACH ROW`);
      callback(TriggerSchema);
      connector.queries.push('BEGIN');
      connector.queries.push(`INSERT INTO ${table} SET ${connector.triggerInsert.join(', ')};`);
      connector.queries.push('END');

      connector
        .mysqlQueryProcess(`${connector.queries.join(' ')}`, (results, err) => {
          if (err) reject(err);
          if (!err) resolve();
        });
    });
  }

  /**
   * Query to create a new trigger with action before update
   *
   * @param {string} table
   * @param {string} triggerTable
   * @param {object} callback
   * @returns promise
   * @memberof Trigger
   */
  createBeforeUpdate(table, triggerTable, callback) {
    return new Promise((resolve, reject) => {
      connector.queries.push(`CREATE TRIGGER before_${triggerTable}_update BEFORE UPDATE ON ${triggerTable} FOR EACH ROW`);
      callback(TriggerSchema);
      connector.queries.push('BEGIN');
      connector.queries.push(`INSERT INTO ${table} SET ${connector.triggerInsert.join(', ')};`);
      connector.queries.push('END');

      connector
        .mysqlQueryProcess(`${connector.queries.join(' ')}`, (results, err) => {
          if (err) reject(err);
          if (!err) resolve();
        });
    });
  }

  /**
   * Query to create a new trigger with action before delete
   *
   * @param {string} table
   * @param {string} triggerTable
   * @param {object} callback
   * @returns promise
   * @memberof Trigger
   */
  createBeforeDelete(table, triggerTable, callback) {
    return new Promise((resolve, reject) => {
      connector.queries.push(`CREATE TRIGGER before_${triggerTable}_delete BEFORE DELETE ON ${triggerTable} FOR EACH ROW`);
      callback(TriggerSchema);
      connector.queries.push('BEGIN');
      connector.queries.push(`INSERT INTO ${table} SET ${connector.triggerInsert.join(', ')};`);
      connector.queries.push('END');

      connector
        .mysqlQueryProcess(`${connector.queries.join(' ')}`, (results, err) => {
          if (err) reject(err);
          if (!err) resolve();
        });
    });
  }

  /**
   * Query to create a new trigger with action after insert
   *
   * @param {string} table
   * @param {string} triggerTable
   * @param {object} callback
   * @returns promise
   * @memberof Trigger
   */
  createAfterInsert(table, triggerTable, callback) {
    return new Promise((resolve, reject) => {
      connector.queries.push(`CREATE TRIGGER after_${triggerTable}_insert AFTER INSERT ON ${triggerTable} FOR EACH ROW`);
      callback(TriggerSchema);
      connector.queries.push('BEGIN');
      connector.queries.push(`INSERT INTO ${table} SET ${connector.triggerInsert.join(', ')};`);
      connector.queries.push('END');

      connector
        .mysqlQueryProcess(`${connector.queries.join(' ')}`, (results, err) => {
          if (err) reject(err);
          if (!err) resolve();
        });
    });
  }

  /**
   * Query to create a new trigger with action after update
   *
   * @param {string} table
   * @param {string} triggerTable
   * @param {object} callback
   * @returns promise
   * @memberof Trigger
   */
  createAfterUpdate(table, triggerTable, callback) {
    return new Promise((resolve, reject) => {
      connector.queries.push(`CREATE TRIGGER after_${triggerTable}_update AFTER UPDATE ON ${triggerTable} FOR EACH ROW`);
      callback(TriggerSchema);
      connector.queries.push('BEGIN');
      connector.queries.push(`INSERT INTO ${table} SET ${connector.triggerInsert.join(', ')};`);
      connector.queries.push('END');

      connector
        .mysqlQueryProcess(`${connector.queries.join(' ')}`, (results, err) => {
          if (err) reject(err);
          if (!err) resolve();
        });
    });
  }

  /**
   * Query to create a new trigger with action after delete
   *
   * @param {string} table
   * @param {string} triggerTable
   * @param {object} callback
   * @returns promise
   * @memberof Trigger
   */
  createAfterDelete(table, triggerTable, callback) {
    return new Promise((resolve, reject) => {
      connector.queries.push(`CREATE TRIGGER after_${triggerTable}_delete AFTER DELETE ON ${triggerTable} FOR EACH ROW`);
      callback(TriggerSchema);
      connector.queries.push('BEGIN');
      connector.queries.push(`INSERT INTO ${table} SET ${connector.triggerInsert.join(', ')};`);
      connector.queries.push('END');

      connector
        .mysqlQueryProcess(`${connector.queries.join(' ')}`, (results, err) => {
          if (err) reject(err);
          if (!err) resolve();
        });
    });
  }

  /**
   * Query to drop a trigger
   *
   * @param {string} triggerName
   * @returns promise
   * @memberof Trigger
   */
  dropTrigger(triggerName) {
    return new Promise((resolve, reject) => {
      connector
        .mysqlQueryProcess(`DROP TRIGGER IF EXISTS \`${triggerName}\``, (results, err) => {
          if (err) reject(err);
          if (!err) resolve();
        });
    });
  }

  /**
   * Reset all schema bindings
   *
   * @static
   * @memberof Schema
   */
  static resetBindings() {
    connector.queries = [];
    connector.triggerInsert = [];
  }
}

module.exports = new Trigger();
