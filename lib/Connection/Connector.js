const mysql = require('mysql');

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
     * The configuration name schema
     * @var {string}
     */
    this.schemaConnection = null;

    /**
     * The current schema table
     * @var {string}
     */
    this.schemaTable = null;

    /**
     * Check whether the user privileges uses identified password or not
     * @var {string}
     */
    this.identified = '';

    /**
     * The current privileges
     * @var {string}
     */
    this.privileges = '';


    /**
     * The current grants
     * @var {array}
     */
    this.grants = [];

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
     * The current schema value bindings
     *
     * @var {object}
     */
    this.schemaBindings = {
      statement: [],
      commandAdd: [],
      commandModify: [],
      renameColumn: [],
      config: [],
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

    /**
     * Targeting table query
     *
     * @var {string}
     */
    this.tables = null;

    /**
     * Status query running with one line or multiple line
     *
     * @var {boolean}
     */
    this.multipleQuery = false;

    /**
     * Stored multiple query
     *
     * @var {array}
    */
    this.queries = [];
  }

  /**
   * Run query mysql
   *
   * @param {string} query
   * @returns promise
   * @memberof Connector
   */
  mysqlQueryProcess(query, callback) {
    const connection = mysql.createConnection(this.connection);
    connection.query(query, async (error, results) => {
      if (error) await callback(null, error);
      if (!error) await callback(results, null);
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
      if (this.multipleQuery === false) {
        this.mysqlQueryProcess(query, (results, err) => {
          /* istanbul ignore else  */
          if (!err) {
            resolve(results);
          } else {
            reject(err);
          }
        });
      }

      if (this.multipleQuery === true) {
        this.mysqlQueryProcess(this.queries.join(' '), (results, err) => {
          this.multipleQuery = false;
          this.queries = [];

          /* istanbul ignore else  */
          if (!err) {
            resolve(results);
          } else {
            reject(err);
          }
        });
      }

      return this;
    });
  }

  /**
   * Get results object from mysql database
   *
   * @param {string} query
   * @returns promise
   * @memberof Connector
   */
  first(query) {
    return new Promise((resolve, reject) => {
      if (this.multipleQuery === false) {
        this.mysqlQueryProcess(query, (results, err) => {
          /* istanbul ignore else  */
          if (!err) {
            resolve(results[0]);
          } else {
            reject(err);
          }
        });
      }

      if (this.multipleQuery === true) {
        this.mysqlQueryProcess(this.queries.join(' '), (results, err) => {
          this.multipleQuery = false;
          this.queries = [];

          /* istanbul ignore else  */
          if (!err) {
            resolve(results[0]);
          } else {
            reject(err);
          }
        });
      }

      return this;
    });
  }

  /**
   * Get results object according to spesific column from mysql database
   *
   * @param {string} query
   * @returns promise
   * @memberof Connector
   */
  pluck(query, columns) {
    return new Promise((resolve, reject) => {
      this.mysqlQueryProcess(query, (results, err) => {
        /* istanbul ignore else  */
        if (!err) {
          const pluckResults = {};
          columns.forEach((data) => {
            if (results[0] !== undefined && results[0][data] !== undefined) {
              pluckResults[data] = results[0][data];
            } else {
              pluckResults[data] = '';
            }
          });
          resolve(pluckResults);
        } else {
          reject(err);
        }
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
      this.mysqlQueryProcess(this.insertGrammar, (results, err) => {
        /* istanbul ignore else  */
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  }

  /**
   * Insert into mysql database and return id
   *
   * @returns promise
   * @memberof Connector
   */
  insertGetId() {
    return new Promise((resolve, reject) => {
      this.mysqlQueryProcess(this.insertGrammar, (results, err) => {
        /* istanbul ignore else  */
        if (!err) {
          resolve(results.insertId);
        } else {
          reject(err);
        }
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
      this.mysqlQueryProcess(this.updateGrammar, (results, err) => {
        /* istanbul ignore else  */
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  }

  /**
   * Delete row mysql database
   *
   * @returns promise
   * @memberof Connector
   */
  delete() {
    return new Promise((resolve, reject) => {
      this.mysqlQueryProcess(this.deleteGrammar, (results, err) => {
        /* istanbul ignore else  */
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  }
}

module.exports = new Connector();
