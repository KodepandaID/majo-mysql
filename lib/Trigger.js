const Connector = require('./Connection/Connector');
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
      Connector
        .mysqlQueryProcess(`SHOW TRIGGERS FROM ${database}`, (results, err) => {
          /* istanbul ignore if  */
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
      Connector
        .mysqlQueryProcess(`SHOW TRIGGERS FROM ${database} WHERE \`Trigger\` = '${triggerName}'`, (results, err) => {
          /* istanbul ignore if  */
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
      Connector.queries.push(`CREATE TRIGGER before_${triggerTable}_insert BEFORE INSERT ON ${triggerTable} FOR EACH ROW`);
      callback(TriggerSchema);
      Connector.queries.push('BEGIN');
      Connector.queries.push(`INSERT INTO ${table} SET ${Connector.triggerInsert.join(', ')};`);
      Connector.queries.push('END');

      Connector
        .mysqlQueryProcess(`${Connector.queries.join(' ')}`, (results, err) => {
          /* istanbul ignore if  */
          if (err) reject(err);
          if (!err) resolve();
        });

      Trigger.resetBindings();
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
      Connector.queries.push(`CREATE TRIGGER before_${triggerTable}_update BEFORE UPDATE ON ${triggerTable} FOR EACH ROW`);
      callback(TriggerSchema);
      Connector.queries.push('BEGIN');
      Connector.queries.push(`INSERT INTO ${table} SET ${Connector.triggerInsert.join(', ')};`);
      Connector.queries.push('END');

      Connector
        .mysqlQueryProcess(`${Connector.queries.join(' ')}`, (results, err) => {
          /* istanbul ignore if  */
          if (err) reject(err);
          if (!err) resolve();
        });

      Trigger.resetBindings();
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
      Connector.queries.push(`CREATE TRIGGER before_${triggerTable}_delete BEFORE DELETE ON ${triggerTable} FOR EACH ROW`);
      callback(TriggerSchema);
      Connector.queries.push('BEGIN');
      Connector.queries.push(`INSERT INTO ${table} SET ${Connector.triggerInsert.join(', ')};`);
      Connector.queries.push('END');

      Connector
        .mysqlQueryProcess(`${Connector.queries.join(' ')}`, (results, err) => {
          /* istanbul ignore if  */
          if (err) reject(err);
          if (!err) resolve();
        });

      Trigger.resetBindings();
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
      Connector.queries.push(`CREATE TRIGGER after_${triggerTable}_insert AFTER INSERT ON ${triggerTable} FOR EACH ROW`);
      callback(TriggerSchema);
      Connector.queries.push('BEGIN');
      Connector.queries.push(`INSERT INTO ${table} SET ${Connector.triggerInsert.join(', ')};`);
      Connector.queries.push('END');

      Connector
        .mysqlQueryProcess(`${Connector.queries.join(' ')}`, (results, err) => {
          /* istanbul ignore if  */
          if (err) reject(err);
          if (!err) resolve();
        });

      Trigger.resetBindings();
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
      Connector.queries.push(`CREATE TRIGGER after_${triggerTable}_update AFTER UPDATE ON ${triggerTable} FOR EACH ROW`);
      callback(TriggerSchema);
      Connector.queries.push('BEGIN');
      Connector.queries.push(`INSERT INTO ${table} SET ${Connector.triggerInsert.join(', ')};`);
      Connector.queries.push('END');

      Connector
        .mysqlQueryProcess(`${Connector.queries.join(' ')}`, (results, err) => {
          /* istanbul ignore if  */
          if (err) reject(err);
          if (!err) resolve();
        });

      Trigger.resetBindings();
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
      Connector.queries.push(`CREATE TRIGGER after_${triggerTable}_delete AFTER DELETE ON ${triggerTable} FOR EACH ROW`);
      callback(TriggerSchema);
      Connector.queries.push('BEGIN');
      Connector.queries.push(`INSERT INTO ${table} SET ${Connector.triggerInsert.join(', ')};`);
      Connector.queries.push('END');

      Connector
        .mysqlQueryProcess(`${Connector.queries.join(' ')}`, (results, err) => {
          /* istanbul ignore if  */
          if (err) reject(err);
          if (!err) resolve();
        });

      Trigger.resetBindings();
    });
  }

  /**
   * Query to drop a trigger
   *
   * @param {array} triggerName
   * @returns promise
   * @memberof Trigger
   */
  dropTrigger(database, ...triggerName) {
    return new Promise((resolve, reject) => {
      triggerName.forEach((trigger, index) => {
        Connector
          .mysqlQueryProcess(`DROP TRIGGER IF EXISTS \`${trigger}\``, (results, err) => {
            /* istanbul ignore if  */
            if (err) reject(err);
            if (!err && triggerName.length === (index + 1)) resolve();
          });
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
    Connector.queries = [];
    Connector.triggerInsert = [];
  }
}

module.exports = new Trigger();
