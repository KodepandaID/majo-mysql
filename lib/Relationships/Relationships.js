const Connector = require('../Connection/Connector');

class Relationships {
  constructor() {
    /**
     * Status query builder used relationship
     * or not
     *
     * @var {boolean}
     */
    this.hasRelationships = false;

    /**
     * Status query use distinct
     *
     * @var {boolean}
     */
    this.selectDistinct = false;

    /**
     * The current insert query
     *
     * @var {string}
     */
    this.insertGrammar = '';

    /**
     * The current update query
     *
     * @var {string}
     */
    this.updateGrammar = '';

    /**
     * The current delete query
     *
     * @var {string}
     */
    this.deleteGrammar = '';

    /**
     * The current where query
     *
     * @var {string}
     */
    this.whereGrammar = '';


    /**
     * The current group by query
     *
     * @var {string}
     */
    this.groupByGrammar = '';

    /**
     * The current order by query
     *
     * @var {string}
     */
    this.orderByGrammar = '';

    /**
     * The current having query
     *
     * @var {string}
     */
    this.havingGrammar = '';

    /**
     * The current join query
     *
     * @var {string}
     */
    this.joinGrammar = '';

    /**
     * All of available operator use
     *
     * @var {array}
     */
    this.operators = [
      '=', '<', '>', '<=', '>=', '<>', '!=', '<=>',
      'like', 'like binary', 'not like', 'ilike',
      '&', '|', '^', '<<', '>>',
      'rlike', 'regexp', 'not regexp',
      '~', '~*', '!~', '!~*', 'similar to',
      'not similar to', 'not ilike', '~~*', '!~~*',
    ];
  }

  /**
   * Function to run relationships
   *
   * @param {string} query
   * @param {array | object} data
   * @returns promise
   * @memberof Relationships
   */
  run(query, data) {
    return new Promise((resolve, reject) => {
      const start = async () => {
        let results = await data;
        await this.asyncForEach(query, async (model) => {
          if (model.relationType === 'hasMany') {
            await this
              .hasMany(model.function, model.table,
                model.objectKey, model.localKey, model.foreignKey, data)
              .then(async (tmpResults) => {
                results = await tmpResults;
              })
              .catch(/* istanbul ignore next */(err) => {
                reject(err);
              });
          } else {
            await this
              .hasOne(model.function, model.table,
                model.objectKey, model.localKey, model.foreignKey, data)
              .then(async (tmpResults) => {
                results = await tmpResults;
              })
              .catch(/* istanbul ignore next */(err) => {
                reject(err);
              });
          }
        });
        resolve(results);
      };
      start();
    });
  }

  /**
   * Helper to make array foreach run with async/await
   *
   * @static
   * @param {array} array
   * @param {*} callback
   * @memberof HasMany
   */
  async asyncForEach(array, callback) {
    if (array.length === undefined) await callback(array, 0);
    else {
      for (let index = 0; index < array.length; index += 1) {
        await callback(array[index], index, array);
      }
    }
  }

  /**
   * This function used to run mysql query to get
   * relation data with has many data
   *
   * @param {void} func
   * @param {string} table
   * @param {string} objectKey
   * @param {string} localKey
   * @param {string} foreignKey
   * @param {object} data
   * @returns Promise
   * @memberof Relationships
   */
  hasMany(func, table, objectKey, localKey, foreignKey, data) {
    return new Promise((resolve, reject) => {
      const Condition = require('./Condition');

      if (data.length === undefined) {
        const results = data;

        if (func !== null) func.call(this, Condition);
        else Condition.select();
        Condition.from(table);
        Condition.where(localKey, data[foreignKey]);

        const query = Condition.makeQuery();
        Relationships.resetBinding();

        Connector
          .get(query)
          .then((tmpResults) => {
            results[objectKey] = tmpResults;
            resolve(results);
          })
          .catch(/* istanbul ignore next */ (err) => {
            reject(err);
          });
      } else {
        const start = async () => {
          const results = [];
          await this.asyncForEach(data, (tmpData) => {
            if (func !== null) func.call(this, Condition);
            else Condition.select();
            Condition.from(table);
            Condition.where(localKey, tmpData[foreignKey]);

            const query = Condition.makeQuery();
            Relationships.resetBinding();

            Connector
              .get(query)
              .then((tmpResults) => {
                tmpData[objectKey] = tmpResults;
                results.push(tmpData);
              })
              .catch(/* istanbul ignore next */ (err) => {
                reject(err);
              });
          });
          resolve(results);
        };
        start();
      }
    });
  }

  /**
   * This function used to run mysql query to get
   * relation data with has one data
   *
   * @param {void} func
   * @param {string} table
   * @param {string} objectKey
   * @param {string} localKey
   * @param {string} foreignKey
   * @param {object} data
   * @returns
   * @memberof Relationships
   */
  hasOne(func, table, objectKey, localKey, foreignKey, data) {
    return new Promise((resolve, reject) => {
      const Condition = require('./Condition');

      if (data.length === undefined) {
        const results = data;

        if (func !== null) func.call(this, Condition);
        else Condition.select();
        Condition.from(table);
        Condition.where(localKey, data[foreignKey]);

        const query = Condition.makeQuery();
        Relationships.resetBinding();

        Connector
          .first(query)
          .then((tmpResults) => {
            results[objectKey] = tmpResults;
            resolve(results);
          })
          .catch(/* istanbul ignore next */ (err) => {
            reject(err);
          });
      } else {
        const start = async () => {
          const results = [];
          await this.asyncForEach(data, (tmpData) => {
            if (func !== null) func.call(this, Condition);
            else Condition.select();
            Condition.from(table);
            Condition.where(localKey, tmpData[foreignKey]);

            const query = Condition.makeQuery();
            Relationships.resetBinding();

            Connector
              .first(query)
              .then((tmpResults) => {
                tmpData[objectKey] = tmpResults;
                results.push(tmpData);
              })
              .catch(/* istanbul ignore next */ (err) => {
                reject(err);
              });
          });
          resolve(results);
        };
        start();
      }
    });
  }

  static resetBinding() {
    Connector.relationshipBindings = {
      select: [],
      from: [],
      join: [],
      where: [],
      orWhere: [],
      having: [],
      order: [],
      group: [],
      mix: [],
    };
  }
}

module.exports = new Relationships();
