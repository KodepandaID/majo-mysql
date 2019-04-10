const Connector = require('../Connection/Connector');

class Db {
  /**
   * Set character set
   *
   * @param {string} character
   * @returns this
   * @memberof Db
   */
  charset(character) {
    Connector.queries.push(`CHARACTER SET ${character}`);
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
    Connector.queries.push(`COLLATE ${collate}`);
    return this;
  }

  /**
   * Set all granted
   *
   * @returns this
   * @memberof Db
   */
  grantAll() {
    Connector.grants.push('ALL PRIVILEGES');
    return this;
  }

  /**
   * Set grant create user
   *
   * @returns this
   * @memberof Db
   */
  grantCreateUser() {
    Connector.grants.push('CREATE USER');
    return this;
  }

  /**
   * Set grant event
   *
   * @returns this
   * @memberof Db
   */
  grantEvent() {
    Connector.grants.push('EVENT');
    return this;
  }

  /**
   * Set grant file
   *
   * @returns this
   * @memberof Db
   */
  grantFile() {
    Connector.grants.push('FILE');
    return this;
  }

  /**
   * Set grant process
   *
   * @returns this
   * @memberof Db
   */
  grantProcess() {
    Connector.grants.push('PROCESS');
    return this;
  }

  /**
   * Set grant reload
   *
   * @returns this
   * @memberof Db
   */
  grantReload() {
    Connector.grants.push('RELOAD');
    return this;
  }

  /**
   * Set grant replication client
   *
   * @returns this
   * @memberof Db
   */
  grantReplicationClient() {
    Connector.grants.push('REPLICATION CLIENT');
    return this;
  }

  /**
   * Set grant replication slave
   *
   * @returns this
   * @memberof Db
   */
  grantReplicationSlave() {
    Connector.grants.push('REPLICATION SLAVE');
    return this;
  }

  /**
   * Set grant show databases
   *
   * @returns this
   * @memberof Db
   */
  grantShowDatabases() {
    Connector.grants.push('SHOW DATABASES');
    return this;
  }

  /**
   * Set grant shutdown
   *
   * @returns this
   * @memberof Db
   */
  grantShutdown() {
    Connector.grants.push('SHUTDOWN');
    return this;
  }

  /**
   * Set grant super
   *
   * @returns this
   * @memberof Db
   */
  grantSuper() {
    Connector.grants.push('SUPER');
    return this;
  }

  /**
   * Set grant create tablespace
   *
   * @returns this
   * @memberof Db
   */
  grantCreateTablespace() {
    Connector.grants.push('CREATE TABLESPACE');
    return this;
  }

  /**
   * Set grant usage
   *
   * @returns this
   * @memberof Db
   */
  grantUsage() {
    Connector.grants.push('USAGE');
    return this;
  }

  /**
   * Set user password
   *
   * @param {string} password
   * @param {string} [driver='mysql']
   * @returns this
   * @memberof Db
   */
  identified(password, driver = 'mysql') {
    if (Connector.queries.length === 0) {
      Connector.identified = `IDENTIFIED BY '${password}'`;
    } else {
      const privileges = Connector.privileges.split('@');
      // On Mysql version 8 and upper, set password only can use auth_string,
      // and by default use mysql_native_password.
      // But Mysql 5.7 or MariaDB not use auth_string.
      if (driver === 'mysql') Connector.queries.push(`SET PASSWORD FOR ${privileges[0]}@${privileges[1]} = PASSWORD('${password}');`);
      if (driver === 'mysql8') Connector.queries.push(`SET PASSWORD FOR ${privileges[0]}@${privileges[1]} = '${password}';`);
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
   * Make query revoke grant
   *
   * @static
   * @param {string} database
   * @param {string} table
   * @param {string} grantType
   * @memberof Db
   */
  static revokeGrant(database, table, grantType) {
    Connector.queries.push(`REVOKE ${grantType} ON ${database}.${table} FROM ${Connector.privileges};`);
    Connector.queries.push(`REVOKE GRANT OPTION ON ${database}.${table} FROM ${Connector.privileges};`);
  }
}

module.exports = new Db();
