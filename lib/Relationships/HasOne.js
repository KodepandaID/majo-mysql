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
          .catch((err) => /* istanbul ignore next */ {
            reject(err);
          });
      }

      if (data.length === 1) {
        HasOne
          .getRelationData(data[0], model)
          .then((results) => {
            resolve(results);
          })
          .catch((err) => /* istanbul ignore next */ {
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
              .catch((err) => /* istanbul ignore next */ {
                reject(err);
              });
          });
        };
        start();
      }
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
      const Connector = require('../Connection/Connector');

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
              .catch((err) => /* istanbul ignore next */ {
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
                  .catch((err) => /* istanbul ignore next */ {
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
}

module.exports = new HasOne();
