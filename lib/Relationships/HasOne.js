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
          .catch((err) => {
            reject(err);
          });
      }

      if (data.length === 1) {
        HasOne
          .getRelationData(data[0], model)
          .then((results) => {
            resolve(results);
          })
          .catch((err) => {
            reject(err);
          });
      }

      if (data.length > 1) {
        data.forEach((tmpData, index) => {
          HasOne
            .getRelationData(tmpData, model)
            .then((results) => {
              if (data.length === (index + 1)) {
                resolve(results);
              }
            })
            .catch((err) => {
              reject(err);
            });
        });
      }
    });
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
  static getRelationData(data, model) {
    return new Promise((resolve, reject) => {
      const Builder = require('../../index');
      const Connector = require('../Connection/Connector');

      Builder
        .select()
        .from(model.table)
        .where(model.localKey, data[model.foreignKey])
        .makeQuery()
        .then((query) => {
          Connector.resetBinding();
          Connector
            .first(query)
            .then((results) => {
              resolve(results);
            })
            .catch((err) => {
              reject(err);
            });
        });
    });
  }
}

module.exports = new HasOne();
