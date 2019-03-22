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
   * Set user password
   *
   * @param {string} password
   * @returns this
   * @memberof Db
   */
  identified(password) {
    if (connector.queries.length > 0) {
      const query = `${connector.queries[0]} IDENTIFIED BY '${password}'`;
      connector.queries[0] = query;
    } else {
      const privileges = connector.privileges.split('@');
      connector.queries.push(`UPDATE mysql.user SET password = PASSWORD('${password}') WHERE User = ${privileges[0]} AND Host = ${privileges[1]}`);
    }
    return this;
  }

  /**
   * Set all revokeed
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  revokeAll(database = '*', table = '*') {
    Db.revokeGrant(database, table, 'ALL PRIVILEGES');
    return this;
  }

  /**
   * Revoke create user
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  revokeCreateUser(database = '*', table = '*') {
    Db.revokeGrant(database, table, 'CREATE USER');
    return this;
  }

  /**
   * Revoke event
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  revokeEvent(database = '*', table = '*') {
    Db.revokeGrant(database, table, 'EVENT');
    return this;
  }

  /**
   * Revoke file
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  revokeFile(database = '*', table = '*') {
    Db.revokeGrant(database, table, 'FILE');
    return this;
  }

  /**
   * Revoke process
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  revokeProcess(database = '*', table = '*') {
    Db.revokeGrant(database, table, 'PROCESS');
    return this;
  }

  /**
   * Revoke reload
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  revokeReload(database = '*', table = '*') {
    Db.revokeGrant(database, table, 'RELOAD');
    return this;
  }

  /**
   * Revoke replication client
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  revokeReplicationClient(database = '*', table = '*') {
    Db.revokeGrant(database, table, 'REPLICATION CLIENT');
    return this;
  }

  /**
   * Revoke replication slave
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  revokeReplicationSlave(database = '*', table = '*') {
    Db.revokeGrant(database, table, 'REPLICATION SLAVE');
    return this;
  }

  /**
   * Revoke show databases
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  revokeShowDatabases(database = '*', table = '*') {
    Db.revokeGrant(database, table, 'SHOW DATABASES');
    return this;
  }

  /**
   * Revoke shutdown
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  revokeShutdown(database = '*', table = '*') {
    Db.revokeGrant(database, table, 'SHUTDOWN');
    return this;
  }

  /**
   * Revoke super
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  revokeSuper(database = '*', table = '*') {
    Db.revokeGrant(database, table, 'SUPER');
    return this;
  }

  /**
   * Revoke create tablespace
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  revokeCreateTablespace(database = '*', table = '*') {
    Db.revokeGrant(database, table, 'CREATE TABLESPACE');
    return this;
  }

  /**
   * Revoke usage
   *
   * @param {string} [database='*']
   * @param {string} [table='*']
   * @returns this
   * @memberof Db
   */
  revokeUsage(database = '*', table = '*') {
    Db.revokeGrant(database, table, 'USAGE');
    return this;
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
    connector.queries.push(`GRANT ${grantType} ON ${database}.${table} TO ${connector.privileges}`);
  }

  /**
   * Make query revoke grant
   *
   * @static
   * @param {string} database
   * @param {string} table
   * @param {string} grantType
   * @memberof Db
   */
  static revokeGrant(database, table, grantType) {
    connector.queries.push(`REVOKE ${grantType} ON ${database}.${table} FROM ${connector.privileges}`);
    connector.queries.push(`REVOKE GRANT OPTION ON ${database}.${table} FROM ${connector.privileges}`);
  }
}

module.exports = new Db();
