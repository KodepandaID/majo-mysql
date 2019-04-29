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
     * The current query value relationships bindings
     *
     * @var {object}
     */
    this.relationshipBindings = {
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

    /**
     * Stored trigger insert
     *
     * @var {array}
    */
    this.triggerInsert = [];
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
      /* istanbul ignore if */
      if (error) {
        await connection.destroy();
        await callback(null, error);
      } else {
        await connection.destroy();
        await callback(results, null);
      }
    });
  }

  /**
   * Function to check if database connected or not
   *
   * @param {*} callback
   * @memberof Connector
   */
  testConnection(callback) {
    const connection = mysql.createConnection(this.connection);
    const startTime = new Date();
    connection.ping(async (err) => {
      /* istanbul ignore if */
      if (err) {
        await connection.destroy();
        await callback(null, err);
      } else {
        await connection.destroy();
        await callback({ response_time: `${new Date() - startTime} ms`, message: 'Connected' }, null);
      }
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
          /* istanbul ignore if */
          if (err) reject(err);
          else resolve(results);
        });
      }

      if (this.multipleQuery === true) {
        this.mysqlQueryProcess(this.queries.join(' '), (results, err) => {
          this.multipleQuery = false;
          this.queries = [];

          /* istanbul ignore if */
          if (err) reject(err);
          else resolve(results);
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
          /* istanbul ignore if */
          if (err) reject(err);
          else resolve(results[0]);
        });
      }

      if (this.multipleQuery === true) {
        this.mysqlQueryProcess(this.queries.join(' '), (results, err) => {
          this.multipleQuery = false;
          this.queries = [];

          /* istanbul ignore if */
          if (err) reject(err);
          else resolve(results[0]);
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
        /* istanbul ignore if */
        if (err) reject(err);
        else resolve();
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
        /* istanbul ignore if */
        if (err) reject(err);
        else resolve(results.insertId);
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
        /* istanbul ignore if */
        if (err) reject(err);
        else resolve();
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
        /* istanbul ignore if */
        if (err) reject(err);
        else resolve();
      });
    });
  }

  resetBinding() {
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

    this.selectDistinct = false;
    this.insertGrammar = '';
    this.updateGrammar = '';
    this.deleteGrammar = '';
    this.whereGrammar = '';
    this.joinGrammar = '';
    this.orderByGrammar = '';
    this.groupByGrammar = '';
    this.havingGrammar = '';
    this.tables = null;
  }

  resetRelationshipBinding() {
    this.relationshipBindings = {
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
  }
}

module.exports = new Connector();
