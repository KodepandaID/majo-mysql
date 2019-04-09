const HasOne = require('../Relationships/HasOne');

class Relationships {
  constructor() {
    /**
     * The stored query relationships
     *
     * @var {array}
     */
    this.storedQuery = [];

    /**
     * The current status, query with relationships or not
     *
     * @var {boolean}
     */
    this.hasRelationships = false;

    /**
     * The current relationships bindings
     *
     * @var {object}
     */
    this.models = {
      hasMany: [],
      hasOne: [],
    };
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
      Object.keys(this.models).forEach((key) => {
        if (this.models[key].length > 0 && key === 'hasOne') {
          this.matching(query, key, (modelIndex) => {
            if (this.models[key][modelIndex][query].length > 1) {
              Relationships
                .hasOne(this.models[key][modelIndex][query], data, (results, err) => {
                  /* istanbul ignore if */
                  if (err) reject(err);
                  if (!err) resolve(results);
                });
            }
          });
        }
      });
    });
  }

  /**
   * Match model, and return index model
   *
   * @param {string} query
   * @param {string} relationType
   * @param {*} callback
   * @memberof Relationships
   */
  matching(query, relationType, callback) {
    this.models[relationType].forEach((data, index) => {
      if (data[query] !== undefined) callback(index);
    });
  }

  /**
   * Switch relationships status with false, after finished running all query relationships
   *
   * @memberof Relationships
   */
  turnOffRelationships() {
    const model = Object.keys(this.models);
    let tmpStatus = false;
    model.forEach((key, index) => {
      if (this.models[key].length > 0) tmpStatus = true;
      if (model.length === (index + 1) && tmpStatus === 0) this.hasRelationships = false;
    });
  }

  /**
   * Remove stored query after finished running
   *
   * @param {string} query
   * @memberof Relationships
   */
  removeStoredQuery(query) {
    const index = this.storedQuery.indexOf(query);
    if (index !== -1) this.storedQuery.splice(index, 1);
  }

  /**
   * Remove model relationships after finished running
   *
   * @param {string} query
   * @memberof Relationships
   */
  removeRelationshipsModel(query) {
    Object.keys(this.models).forEach((relationType) => {
      this.models[relationType].forEach((data) => {
        if (data[query] !== undefined) this.models[relationType].splice(0, 1);
      });
    });
  }

  /**
   * Call class HasOne, to getting relationships data
   *
   * @static
   * @param {object} model
   * @param {array | object} data
   * @param {*} callback
   * @memberof Relationships
   */
  static hasOne(model, data, callback) {
    HasOne
      .get(data, model)
      .then((results) => {
        callback(results, null);
      })
      .catch((err) => {
        callback(null, err);
      });
  }
}

module.exports = new Relationships();
