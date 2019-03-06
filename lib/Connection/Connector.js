const mysql = require('mysql2');

class Connector {
  constructor() {
    /**
     * The configuration database
     * @var {object}
     */
    this.connection = {
      host: 'localhost',
      user: 'root',
      password: '',
      database: '',
    };

    /**
     * The current query value bindings
     *
     * @var {object}
     */
    this.bindings = {
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
    this.insertGrammar = null;

    /**
     * The current update query
     *
     * @var {string}
     */
    this.updateGrammar = null;

    /**
     * The current delete query
     *
     * @var {string}
     */
    this.deleteGrammar = null;

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

    /**
     * Targeting table query
     *
     * @var {string}
     */
    this.tables = null;
  }

  /**
   * Run query mysql
   *
   * @static
   * @param {string} query
   * @returns promise
   * @memberof Connector
   */
  mysqlQueryProcess(query) {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(this.connection);
      connection
        .query(query, (err, results) => {
          if (err) {
            reject(err);
          }

          if (!err) {
            resolve(results);
          }
        });
    });
  }

  /**
   * Get results from mysql database
   *
   * @param {string} query
   * @returns promise
   * @memberof Connector
   */
  get(query) {
    return new Promise((resolve, reject) => {
      this.mysqlQueryProcess(query)
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          reject(err);
        });

      return this;
    });
  }

  /**
   * Get results from mysql database
   *
   * @param {string} query
   * @returns promise
   * @memberof Connector
   */
  first(query) {
    return new Promise((resolve, reject) => {
      this.mysqlQueryProcess(query)
        .then((results) => {
          resolve(results[0]);
        })
        .catch((err) => {
          reject(err);
        });

      return this;
    });
  }

  /**
   * Insert into mysql database
   *
   * @returns promise
   * @memberof Connector
   */
  insert() {
    return new Promise((resolve, reject) => {
      this.mysqlQueryProcess(this.insertGrammar)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * Update set value mysql database
   *
   * @returns promise
   * @memberof Connector
   */
  update() {
    return new Promise((resolve, reject) => {
      this.mysqlQueryProcess(this.updateGrammar)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = new Connector();
