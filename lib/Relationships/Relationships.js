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
      belongsTo: [],
      belongsToMany: [],
      hasMany: [],
      hasManyThrought: [],
      hasOne: [],
      hasOneOrMany: [],
      hasOneThrought: [],
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
            Relationships
              .hasOne(this.models[key][modelIndex][query], data, (results, err) => {
                if (err) {
                  this.removeStoredQuery(query);
                  this.removeRelationshipsModel(query, 'hasOne');
                  reject(err);
                }

                if (!err) {
                  const objectKey = this.models[key][0][query].objectName;
                  this.removeStoredQuery(query);
                  this.removeRelationshipsModel(query, 'hasOne');
                  this.turnOffRelationships();
                  resolve(Relationships.extendRelationData(objectKey, data, results));
                }
              });
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
   * @param {string} relationType
   * @memberof Relationships
   */
  removeRelationshipsModel(query, relationType) {
    this.models[relationType].forEach((data) => {
      if (data[query] !== undefined) this.models[relationType].splice(0, 1);
    });
  }

  /**
   * Merge primary data with relationships data
   *
   * @static
   * @param {string} objectName
   * @param {array | object} data
   * @param {array | object} relationData
   * @returns array | object
   * @memberof Relationships
   */
  static extendRelationData(objectName, data, relationData) {
    if (data.length === undefined) {
      data[objectName] = relationData;
      return data;
    }

    if (data.length > 0) {
      const extendData = data.map((tmp) => {
        tmp[objectName] = relationData;
        return tmp;
      });
      return extendData;
    }
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
