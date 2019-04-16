class HasMany {
  /**
   * Get relation data
   *
   * @param {array | object} data
   * @param {object} model
   * @returns promise
   * @memberof HasMany
   */
  get(data, model) {
    return new Promise((resolve, reject) => {
      if (data.length === undefined) {
        HasMany
          .getRelationData(data, model)
          .then((results) => {
            resolve(results);
          })
          .catch(/* istanbul ignore next */ (err) => {
            reject(err);
          });
      }

      if (data.length === 1) {
        HasMany
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
          await HasMany.asyncForEach(data, async (tmpData, index) => {
            HasMany
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
   * Helper to make array foreach run with async/await
   *
   * @static
   * @param {array} array
   * @param {*} callback
   * @memberof HasMany
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
   * @memberof HasMany
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
              .get(query)
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
          await HasMany.asyncForEach(models, async (tmpModel) => {
            await Builder
              .select()
              .from(tmpModel.table)
              .where(tmpModel.localKey, data[tmpModel.foreignKey])
              .makeQuery()
              .then(async (query) => {
                await Connector
                  .get(query)
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
}

module.exports = new HasMany();
