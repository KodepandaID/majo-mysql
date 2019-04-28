const Builder = require('../../index');
const Connector = require('../Connection/Connector');

class HasOne {
  /**
   * Get relation data
   *
   * @param {array | object} data
   * @param {object} model
   * @returns promise
   * @memberof HasOne
   */
  get(data, model) {
    return new Promise((resolve, reject) => {
      if (data.length === undefined) {
        HasOne
          .getRelationData(data, model)
          .then((results) => {
            resolve(results);
          })
          .catch(/* istanbul ignore next */ (err) => {
            reject(err);
          });
      }

      if (data.length === 1) {
        HasOne
          .getRelationData(data[0], model)
          .then((results) => {
            resolve(results);
          })
          .catch(/* istanbul ignore next */ (err) => {
            reject(err);
          });
      }

      if (data.length > 1) {
        const start = async () => {
          await HasOne.asyncForEach(data, async (tmpData, index) => {
            HasOne
              .getRelationData(tmpData, model)
              .then(async (results) => {
                data[index] = await results;
                if (data.length === (index + 1)) {
                  resolve(data);
                }
              })
              .catch(/* istanbul ignore next */ (err) => {
                reject(err);
              });
          });
        };
        start();
      }
    });
  }

  getWithCondition(data, model, storedQuery) {
    return new Promise((resolve, reject) => {
      HasOne
        .getRelationDataWithCondition(data, model, storedQuery)
        .then((results) => {
          resolve(results);
        })
        .catch(/* istanbul ignore next */ (err) => {
          reject(err);
        });
    });
  }

  /**
   * Helper to make array foreach run with async/await
   *
   * @static
   * @param {array} array
   * @param {*} callback
   * @memberof HasOne
   */
  static async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index += 1) {
      await callback(array[index], index, array);
    }
  }

  /**
   * Query to get relation data
   *
   * @static
   * @param {array | object} data
   * @param {object} model
   * @returns promise
   * @memberof HasOne
   */
  static getRelationData(data, models) {
    return new Promise((resolve, reject) => {
      if (models.length === undefined) {
        Builder
          .select()
          .from(models.table)
          .where(models.localKey, data[models.foreignKey])
          .makeQuery()
          .then((query) => {
            Connector
              .first(query)
              .then((results) => {
                data[models.objectName] = results;
                resolve(data);
              })
              .catch(/* istanbul ignore next */ (err) => {
                reject(err);
              });
          });
      } else {
        const start = async () => {
          await HasOne.asyncForEach(models, async (tmpModel) => {
            await Builder
              .select()
              .from(tmpModel.table)
              .where(tmpModel.localKey, data[tmpModel.foreignKey])
              .makeQuery()
              .then(async (query) => {
                await Connector
                  .first(query)
                  .then(async (results) => {
                    data[tmpModel.objectName] = await results === undefined ? null : results;
                  })
                  .catch(/* istanbul ignore next */ (err) => {
                    reject(err);
                  });
              });
          });
          resolve(data);
        };
        start();
      }
    });
  }

  static getRelationDataWithCondition(data, models, storedQuery) {
    return new Promise((resolve, reject) => {
      const Condition = require('./Condition');

      Condition.where(models.localKey, data[models.foreignKey]);

      const query = HasOne.queryBuilder(models.table, storedQuery);
      Connector
        .first(query)
        .then((results) => {
          data[models.objectName] = results;
          resolve(data);
        })
        .catch(/* istanbul ignore next */ (err) => {
          reject(err);
        });
    });
  }

  static queryJoinBuilder(storedQuery) {
    if (Connector.relationshipBindings.join[storedQuery] !== undefined) {
      Connector.joinGrammar = Connector.relationshipBindings.join[storedQuery].join(' ');
    }
  }

  static queryWhereBuilder(storedQuery) {
    if (Connector.relationshipBindings.where[storedQuery] !== undefined) {
      Connector.whereGrammar = `WHERE ${Connector.relationshipBindings.where[storedQuery].join(' AND ')}`;
    }

    if (Connector.bindings.orWhere[storedQuery] !== undefined) {
      Connector.whereGrammar = `${Connector.whereGrammar} OR ${Connector.relationshipBindings.orWhere[storedQuery].join(' OR ')}`;
    }
  }

  static queryGroupByBuilder(storedQuery) {
    if (Connector.relationshipBindings.group[storedQuery] !== undefined) {
      Connector.groupByGrammar = `GROUP BY ${Connector.relationshipBindings.group[storedQuery].join(', ')}`;
    }
  }

  static queryOrderByBuilder(storedQuery) {
    if (Connector.relationshipBindings.order[storedQuery] !== undefined) {
      Connector.orderByGrammar = `ORDER BY ${Connector.relationshipBindings.order[storedQuery].join(', ')}`;
    }
  }

  static queryHavingBuilder(storedQuery) {
    if (Connector.relationshipBindings.having[storedQuery] !== undefined) {
      Connector.havingGrammar = `HAVING ${Connector.relationshipBindings.having[storedQuery].join(' AND ')}`;
    }
  }

  static queryBuilder(table, storedQuery) {
    const select = `SELECT${Connector.relationshipSelectDistinct === true ? ' DISTINCT' : ''} ${Connector.relationshipBindings.select[storedQuery] === undefined ? '*' : Connector.relationshipBindings.select[storedQuery].join(', ')}`;

    HasOne.queryJoinBuilder(storedQuery);
    HasOne.queryWhereBuilder(storedQuery);
    HasOne.queryOrderByBuilder(storedQuery);
    HasOne.queryGroupByBuilder(storedQuery);
    HasOne.queryHavingBuilder(storedQuery);

    const query = `${select} FROM ${table} ${Connector.joinGrammar} ${Connector.whereGrammar} ${Connector.orderByGrammar} ${Connector.groupByGrammar} ${Connector.havingGrammar}`;
    return query;
  }
}

module.exports = new HasOne();
