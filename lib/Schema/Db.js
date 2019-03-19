const connector = require('../Connection/Connector');

class Db {
  /**
   * Set character set
   *
   * @param {string} character
   * @returns this
   * @memberof Db
   */
  charset(character) {
    connector.queries.push(`CHARACTER SET ${character}`);
    return this;
  }

  /**
   * Set collation
   *
   * @param {string} collate
   * @returns this
   * @memberof Db
   */
  collation(collate) {
    connector.queries.push(`COLLATE ${collate}`);
    return this;
  }
}

module.exports = new Db();
