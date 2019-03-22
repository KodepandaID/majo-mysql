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

  /**
   * Set all granted
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  grantAll(database = '*', table = '*') {
    Db.setGrant(database, table, 'ALL PRIVILEGES');
    return this;
  }

  /**
   * Set grant create user
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  grantCreateUser(database = '*', table = '*') {
    Db.setGrant(database, table, 'CREATE USER');
    return this;
  }

  /**
   * Set grant event
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  grantEvent(database = '*', table = '*') {
    Db.setGrant(database, table, 'EVENT');
    return this;
  }

  /**
   * Set grant file
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  grantFile(database = '*', table = '*') {
    Db.setGrant(database, table, 'FILE');
    return this;
  }

  /**
   * Set grant process
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  grantProcess(database = '*', table = '*') {
    Db.setGrant(database, table, 'PROCESS');
    return this;
  }

  /**
   * Set grant reload
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  grantReload(database = '*', table = '*') {
    Db.setGrant(database, table, 'RELOAD');
    return this;
  }

  /**
   * Set grant replication client
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  grantReplicationClient(database = '*', table = '*') {
    Db.setGrant(database, table, 'REPLICATION CLIENT');
    return this;
  }

  /**
   * Set grant replication slave
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  grantReplicationSlave(database = '*', table = '*') {
    Db.setGrant(database, table, 'REPLICATION SLAVE');
    return this;
  }

  /**
   * Set grant show databases
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  grantShowDatabases(database = '*', table = '*') {
    Db.setGrant(database, table, 'SHOW DATABASES');
    return this;
  }

  /**
   * Set grant shutdown
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  grantShutdown(database = '*', table = '*') {
    Db.setGrant(database, table, 'SHUTDOWN');
    return this;
  }

  /**
   * Set grant super
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  grantSuper(database = '*', table = '*') {
    Db.setGrant(database, table, 'SUPER');
    return this;
  }

  /**
   * Set grant create tablespace
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  grantCreateTablespace(database = '*', table = '*') {
    Db.setGrant(database, table, 'CREATE TABLESPACE');
    return this;
  }

  /**
   * Set grant usage
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  grantUsage(database = '*', table = '*') {
    Db.setGrant(database, table, 'USAGE');
    return this;
  }

  /**
   * Get user and host from query create user
   *
   * @static
   * @returns string
   * @memberof Db
   */
  static getUserAndHost() {
    const query = connector.queries[0].split(' ');
    return query;
  }

  /**
   * Make query grant
   *
   * @static
   * @param {string} database
   * @param {string} table
   * @param {string} grantType
   * @memberof Db
   */
  static setGrant(database, table, grantType) {
    const query = Db.getUserAndHost();
    connector.queries.push(`GRANT ${grantType} ON ${database}.${table} TO ${query[2]}`);
  }
}

module.exports = new Db();
