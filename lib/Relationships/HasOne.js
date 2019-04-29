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

  /**
   * This function used to get relation data with
   * query condition
   *
   * @static
   * @param {array} data
   * @param {object} models
   * @param {string} storedQuery
   * @returns Promise | object
   * @memberof HasOne
   */
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
      const Builder = require('../../index');

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

  /**
   * This function used to get relation data with
   * query condition
   *
   * @static
   * @param {array} data
   * @param {object} models
   * @param {string} storedQuery
   * @returns Promise | object
   * @memberof HasOne
   */
  static getRelationDataWithCondition(data, models, storedQuery) {
    return new Promise((resolve, reject) => {
      const Condition = require('./Condition');

      if (data[0] === undefined) Condition.where(models.localKey, data[models.foreignKey]);
      else Condition.where(models.localKey, data[0][models.foreignKey]);

      const query = Condition.queryBuilder(models.table, storedQuery);
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
}

module.exports = new HasOne();
