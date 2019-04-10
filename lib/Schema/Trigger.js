const Connector = require('../Connection/Connector');

class Trigger {
  /**
   * Set insert into field
   *
   * @param {string} fieldName
   * @returns this
   * @memberof Trigger
   */
  field(fieldName) {
    Connector.triggerInsert.push(`${fieldName}`);
    return this;
  }

  /**
   * Set insert into field value
   *
   * @param {string | number} value
   * @returns this
   * @memberof Trigger
   */
  value(value) {
    if (value !== undefined && value !== null) {
      if (typeof value === 'number') {
        Trigger.insertToLastTrigger(value);
      } else {
        Trigger.insertToLastTrigger(`'${value}'`);
      }
    }

    return this;
  }

  /**
   * Set insert into field value to new value
   *
   * @param {string} fieldName
   * @returns this
   * @memberof Trigger
   */
  new(fieldName) {
    Trigger.insertToLastTrigger(`NEW.${fieldName}`);
    return this;
  }

  /**
   * Set insert into field value to datetime
   *
   * @returns this
   * @memberof Trigger
   */
  now() {
    Trigger.insertToLastTrigger('NOW()');
    return this;
  }

  /**
   * Set insert into field value to old value
   *
   * @param {string} fieldName
   * @returns this
   * @memberof Trigger
   */
  old(fieldName) {
    Trigger.insertToLastTrigger(`OLD.${fieldName}`);
    return this;
  }

  /**
   * Push value to last set value trigger
   *
   * @static
   * @param {string | number} value
   * @memberof Trigger
   */
  static insertToLastTrigger(value) {
    const lastTriggerIndex = (Connector.triggerInsert.length - 1);
    Connector.triggerInsert[lastTriggerIndex] = `${Connector.triggerInsert[lastTriggerIndex]} = ${value}`;
  }
}

module.exports = new Trigger();
