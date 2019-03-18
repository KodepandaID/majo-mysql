const connector = require('../Connection/Connector');

class Table {
  /**
   * Set primary column with column type is integer and auto increment
   *
   * @param {string} [column='id']
   * @returns this
   * @memberof Table
   */
  increment(column = 'id') {
    Table.addCommand(`${column} INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY`);
    return this;
  }

  /**
   * Set primary column with column type is tiny integer and auto increment
   *
   * @param {string} [column='id']
   * @returns this
   * @memberof Table
   */
  tinyIncrement(column = 'id') {
    Table.addCommand(`${column} TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY`);
    return this;
  }

  /**
   * Set primary column with column type is small integer and auto increment
   *
   * @param {string} [column='id']
   * @returns this
   * @memberof Table
   */
  smallIncrement(column = 'id') {
    Table.addCommand(`${column} SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY`);
    return this;
  }

  /**
   * Set primary column with column type is medium integer and auto increment
   *
   * @param {string} [column='id']
   * @returns this
   * @memberof Table
   */
  mediumIncrement(column = 'id') {
    Table.addCommand(`${column} MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY`);
    return this;
  }

  /**
   * Set primary column with column type is big integer and auto increment
   *
   * @param {string} [column='id']
   * @returns this
   * @memberof Table
   */
  bigIncrement(column = 'id') {
    Table.addCommand(`${column} BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY`);
    return this;
  }

  /**
   * Set column with integer type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  integer(column) {
    Table.addCommand(`${column} INT`);
    return this;
  }

  /**
   * Set column with tiny integer type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  tinyInteger(column) {
    Table.addCommand(`${column} TINYINT`);
    return this;
  }

  /**
   * Set column with small integer type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  smallInteger(column) {
    Table.addCommand(`${column} SMALLINT`);
    return this;
  }

  /**
   * Set column with medium integer type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  mediumInteger(column) {
    Table.addCommand(`${column} MEDIUMINT`);
    return this;
  }

  /**
   * Set column with big integer type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  bigInteger(column) {
    Table.addCommand(`${column} BIGINT`);
    return this;
  }

  /**
   * Set column with binary type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  binary(column) {
    Table.addCommand(`${column} BINARY`);
    return this;
  }

  /**
   * Set column with bool type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  boolean(column) {
    Table.addCommand(`${column} BOOL`);
    return this;
  }

  /**
   * Set column with char type
   *
   * @param {string} column
   * @param {number} [length=100]
   * @returns this
   * @memberof Table
   */
  char(column, length = 100) {
    Table.addCommand(`${column} CHAR(${length})`);
    return this;
  }

  /**
   * Set column with date type
   *
   * @param {string} [column='created_at']
   * @returns this
   * @memberof Table
   */
  date(column = 'created_at') {
    Table.addCommand(`${column} DATE`);
    return this;
  }

  /**
   * Set column with datetime type
   *
   * @param {string} [column='created_at']
   * @returns this
   * @memberof Table
   */
  dateTime(column = 'created_at') {
    Table.addCommand(`${column} DATETIME`);
    return this;
  }

  /**
   * Set column with decimal type
   *
   * @param {string} column
   * @param {number} [precision=8]
   * @param {number} [scale=2]
   * @returns this
   * @memberof Table
   */
  decimal(column, precision = 8, scale = 2) {
    Table.addCommand(`${column} DECIMAL(${precision}, ${scale})`);
    return this;
  }

  /**
   * Set column with double type
   *
   * @param {string} column
   * @param {number} [precision=8]
   * @param {number} [scale=2]
   * @returns this
   * @memberof Table
   */
  double(column, precision = 8, scale = 2) {
    Table.addCommand(`${column} DOUBLE(${precision}, ${scale})`);
    return this;
  }

  /**
   * Set column with enum type
   *
   * @param {string} column
   * @param {array} defaults
   * @returns this
   * @memberof Table
   */
  enum(column, defaults) {
    const arrDefault = [];
    defaults.forEach((value) => {
      arrDefault.push(`'${value}'`);
    });

    Table.addCommand(`${column} ENUM(${arrDefault.join(', ')})`);
    return this;
  }

  /**
   * Set column with float type
   *
   * @param {string} column
   * @param {number} [precision=8]
   * @param {number} [scale=2]
   * @returns this
   * @memberof Table
   */
  float(column, precision = 8, scale = 2) {
    Table.addCommand(`${column} FLOAT(${precision}, ${scale})`);
    return this;
  }

  /**
   * Set column with geometry type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  geometry(column) {
    Table.addCommand(`${column} GEOMETRY`);
    return this;
  }

  /**
   * Set column with geometrycollection type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  geometryCollection(column) {
    Table.addCommand(`${column} GEOMETRYCOLLECTION`);
    return this;
  }

  /**
   * Set column ip address with varchar type and length 45
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  ipAddress(column) {
    Table.addCommand(`${column} VARCHAR(45)`);
    return this;
  }

  /**
   * Set column with json type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  json(column) {
    Table.addCommand(`${column} LONGTEXT`);
    return this;
  }

  /**
   * Set column with linestring type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  lineString(column) {
    Table.addCommand(`${column} LINESTRING`);
    return this;
  }

  /**
   * Set column with longtext type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  longText(column) {
    Table.addCommand(`${column} LONGTEXT`);
    return this;
  }

  /**
   * Set column with varchar type and length 17
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  macAddress(column) {
    Table.addCommand(`${column} VARCHAR(17)`);
    return this;
  }

  /**
   * Set column with mediumtext type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  mediumText(column) {
    Table.addCommand(`${column} MEDIUMTEXT`);
    return this;
  }

  /**
   * Set column with multilinestring type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  multiLineString(column) {
    Table.addCommand(`${column} MULTILINESTRING`);
    return this;
  }

  /**
   * Set column with multipoint type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  multiPoint(column) {
    Table.addCommand(`${column} MULTIPOINT`);
    return this;
  }

  /**
   * Set column with multipolygon type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  multiPolygon(column) {
    Table.addCommand(`${column} MULTIPOLYGON`);
    return this;
  }

  /**
   * Set column with point type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  point(column) {
    Table.addCommand(`${column} POINT`);
    return this;
  }

  /**
   * Set column with polygon type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  polygon(column) {
    Table.addCommand(`${column} POLYGON`);
    return this;
  }

  /**
   * Set column remember_token with varchart type and length 100
   *
   * @returns this
   * @memberof Table
   */
  rememberToken() {
    Table.addCommand('remember_token VARCHAR(100)');
    return this;
  }

  /**
   * Set column with varchar type
   *
   * @param {string} column
   * @param {number} [length=100]
   * @returns this
   * @memberof Table
   */
  string(column, length = 100) {
    Table.addCommand(`${column} VARCHAR(${length})`);
    return this;
  }

  /**
   * Set column with text type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  text(column) {
    Table.addCommand(`${column} TEXT`);
    return this;
  }

  /**
   * Set column with time type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  time(column) {
    Table.addCommand(`${column} TIME`);
    return this;
  }

  /**
   * Set column with timestamp type
   *
   * @param {string} [column='added_on']
   * @returns this
   * @memberof Table
   */
  timeStamp(column = 'added_on') {
    Table.addCommand(`${column} TIMESTAMP`);
    return this;
  }

  /**
   * Set column created_at and updated_at with timestamp type and null value
   *
   * @returns this
   * @memberof Table
   */
  timestamps() {
    Table.addCommand('created_at TIMESTAMP NULL');
    Table.addCommand('updated_at TIMESTAMP NULL');
    return this;
  }

  /**
   * Set column with unsigned bigint type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  unsignedBigInteger(column) {
    Table.addCommand(`${column} BIGINT UNSIGNED`);
    return this;
  }

  /**
   * Set column with unsigned decimal type
   *
   * @param {string} column
   * @param {number} [precision=8]
   * @param {number} [scale=2]
   * @returns this
   * @memberof Table
   */
  unsignedDecimal(column, precision = 8, scale = 2) {
    Table.addCommand(`${column} DECIMAL(${precision}, ${scale}) UNSIGNED`);
    return this;
  }

  /**
   * Set column with unsigned int type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  unsignedInteger(column) {
    Table.addCommand(`${column} INT UNSIGNED`);
    return this;
  }

  /**
   * Set column with unsigned mediumint type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  unsignedMediumInteger(column) {
    Table.addCommand(`${column} MEDIUMINT UNSIGNED`);
    return this;
  }

  /**
   * Set column with unsigned smallint type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  unsignedSmallInteger(column) {
    Table.addCommand(`${column} SMALLINT UNSIGNED`);
    return this;
  }

  /**
   * Set column with unsigned tinyint type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  unsignedTinyInteger(column) {
    Table.addCommand(`${column} TINYINT UNSIGNED`);
    return this;
  }

  /**
   * Set column uuid with char type and length 36
   *
   * @param {string} [column='id']
   * @returns this
   * @memberof Table
   */
  uuid(column = 'id') {
    Table.addCommand(`${column} CHAR(36)`);
    return this;
  }

  /**
   * Set column with year type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  year(column) {
    Table.addCommand(`${column} YEAR`);
    return this;
  }

  /**
   * Set column with auto increment primary key
   *
   * @returns this
   * @memberof Table
   */
  autoIncrement() {
    Table.pushToLastBinding('AUTO_INCREMENT PRIMARY KEY');
    return this;
  }

  /**
   * Set column with custom character set
   *
   * @param {string} character
   * @returns this
   * @memberof Table
   */
  charset(character) {
    Table.pushToLastBinding(`CHARACTER SET ${character}`);
    return this;
  }

  /**
   * Set column with custom collate
   *
   * @param {string} collate
   * @returns this
   * @memberof Table
   */
  collation(collate) {
    Table.pushToLastBinding(`COLLATE ${collate}`);
    return this;
  }

  /**
   * Set column with comment
   *
   * @param {string} commentText
   * @returns this
   * @memberof Table
   */
  comment(commentText) {
    Table.pushToLastBinding(`COMMENT '${commentText}'`);
    return this;
  }

  /**
   * Set column with default value
   *
   * @param {string | number | boolean} value
   * @returns this
   * @memberof Table
   */
  default(value) {
    Table.pushToLastBinding(`DEFAULT ${typeof value === 'string' ? `'${value}'` : value}`);
    return this;
  }

  /**
   * Set column with value NULL or NOT NULL
   *
   * @param {boolean} [value=true]
   * @returns this
   * @memberof Table
   */
  nullable(value = true) {
    if (value === true) {
      Table.pushToLastBinding('NULL');
    }

    if (value === false) {
      Table.pushToLastBinding('NOT NULL');
    }

    return this;
  }

  /**
   * Set integer column with unsigned
   *
   * @returns this
   * @memberof Table
   */
  unsigned() {
    Table.pushToLastBinding('UNSIGNED');
    return this;
  }

  /**
   * Set timestamp column with default value current timestamp
   *
   * @returns this
   * @memberof Table
   */
  useCurrent() {
    Table.pushToLastBinding('DEFAULT CURRENT_TIMESTAMP');
    return this;
  }

  /**
   * Drop unique key from database table
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  dropUnique(column) {
    this.dropIndex(column, 'unique');
    return this;
  }

  /**
   * Set column with unique index key
   *
   * @param {array} args
   * @returns this
   * @memberof Table
   */
  unique(...args) {
    const toSchema = Table.getSchema();

    if (connector.schemaBindings.statement[0] === 'CREATE TABLE') {
      const last = Table.getQueryLastBinding();
      const column = last.query.split(' ');
      connector.schemaBindings.commandAdd.push(`UNIQUE ${connector.schemaTable}_${column[0]}_unique(${column[0]})`);
    }

    if (connector.schemaBindings.statement[0] === 'ALTER TABLE') {
      connector.queries.push(`ALTER TABLE ${toSchema} ADD UNIQUE ${connector.schemaTable}_${args[0]}_unique(${args.join(', ')})`);
    }

    return this;
  }

  /**
   * Rename unique key name from database table
   *
   * @param {string} columnName
   * @param {string} oldKeyName
   * @param {string} newKeyName
   * @returns this
   * @memberof Table
   */
  renameUnique(columnName, oldKeyName, newKeyName) {
    const toSchema = Table.getSchema();
    connector.queries.push(`ALTER TABLE ${toSchema} DROP INDEX ${oldKeyName}, ADD UNIQUE ${newKeyName}(${columnName})`);
    return this;
  }

  /**
   * Drop primary key
   *
   * @param {string} [column='id']
   * @returns this
   * @memberof Table
   */
  dropPrimary(column = 'id') {
    const toSchema = Table.getSchema();
    connector.queries.push(`ALTER TABLE ${toSchema} MODIFY COLUMN ${column} INT NOT NULL, DROP PRIMARY KEY`);
    return this;
  }

  /**
   * Set primary key index to column
   *
   * @param {array} column
   * @returns this
   * @memberof Table
   */
  primary(...args) {
    const toSchema = Table.getSchema();
    const index = (connector.queries.length - 1);
    const lastQuery = connector.queries[index];

    if (connector.schemaBindings.statement[0] === 'CREATE TABLE') {
      const last = Table.getQueryLastBinding();
      const column = last.query.split(' ');
      connector.schemaBindings.commandAdd.push(`PRIMARY KEY ${connector.schemaTable}_${column[0]}_primary(${column[0]})`);
    }

    if (connector.schemaBindings.statement[0] === 'ALTER TABLE') {
      if (lastQuery !== undefined && lastQuery.includes('DROP PRIMARY KEY')) {
        Table.pushToLastBinding(`, ADD PRIMARY KEY ${connector.schemaTable}_${args[0]}_primary(${args[0]})`);
      } else {
        connector.queries.push(`ALTER TABLE ${toSchema} ADD PRIMARY KEY ${connector.schemaTable}_${args[0]}_primary(${args.join(', ')})`);
      }
    }

    return this;
  }

  /**
   * Drop spatial key from database table
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  dropSpatial(column) {
    this.dropIndex(`${connector.schemaTable}_${column}_spatial`);
    return this;
  }

  /**
   * Set column with spatial key
   *
   * @param {array} args
   * @returns this
   * @memberof Table
   */
  spatial(...args) {
    const toSchema = Table.getSchema();

    if (connector.schemaBindings.statement[0] === 'CREATE TABLE') {
      const last = Table.getQueryLastBinding();
      const column = last.query.split(' ');
      connector.schemaBindings.commandAdd[last.index] = `${last.query} NOT NULL`;
      connector.schemaBindings.commandAdd.push(`SPATIAL ${connector.schemaTable}_${column[0]}_spatial(${column[0]})`);
    }

    if (connector.schemaBindings.statement[0] === 'ALTER TABLE') {
      connector.queries.push(`ALTER TABLE ${toSchema} ADD SPATIAL ${connector.schemaTable}_${args[0]}_spatial(${args.join(', ')})`);
    }

    return this;
  }

  /**
   * Drop index key from database table
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  dropIndex(column, type = 'index') {
    const toSchema = Table.getSchema();
    connector.queries.push(`ALTER TABLE ${toSchema} DROP INDEX ${connector.schemaTable}_${column}_${type}`);
    return this;
  }

  /**
   * Set index key to column
   *
   * @param {array} args
   * @returns this
   * @memberof Table
   */
  index(...args) {
    if (connector.schemaBindings.statement[0] === 'CREATE TABLE') {
      const last = Table.getQueryLastBinding();
      const column = last.query.split(' ');
      connector.schemaBindings.commandAdd.push(`INDEX ${connector.schemaTable}_${column[0]}_index(${column[0]})`);
    }

    if (connector.schemaBindings.statement[0] === 'ALTER TABLE') {
      const toSchema = Table.getSchema();
      connector.queries.push(`ALTER TABLE ${toSchema} ADD INDEX ${connector.schemaTable}_${args[0]}_index(${args.join(', ')})`);
    }

    return this;
  }

  /**
   * Rename index key name from database table
   *
   * @param {string} columnName
   * @param {string} oldKeyName
   * @param {string} newKeyName
   * @returns this
   * @memberof Table
   */
  renameIndex(columnName, oldKeyName, newKeyName) {
    const toSchema = Table.getSchema();
    connector.queries.push(`ALTER TABLE ${toSchema} DROP INDEX ${oldKeyName}, ADD INDEX ${newKeyName}(${columnName})`);
    return this;
  }

  /**
   * Set table with custom engine
   *
   * @param {string} [engine='InnoDB']
   * @returns this
   * @memberof Schema
   */
  setEngine(engine = 'InnoDB') {
    Table.addConfig(`ENGINE = ${engine}`);
    return this;
  }

  /**
   * Set table with custom character set
   *
   * @param {string} [charset='utf8']
   * @returns this
   * @memberof Schema
   */
  setCharset(charset = 'utf8') {
    Table.addConfig(`DEFAULT CHARSET = ${charset}`);
    return this;
  }

  /**
   * Set table with custom collation
   *
   * @param {string} [collate='utf8_unicode_ci']
   * @returns this
   * @memberof Schema
   */
  setCollation(collate = 'utf8_unicode_ci') {
    Table.addConfig(`COLLATE = ${collate}`);
    return this;
  }

  /**
   * Set table comment description
   *
   * @param {string} comment
   * @returns this
   * @memberof Schema
   */
  setComment(comment) {
    Table.addConfig(`COMMENT = '${comment}'`);
    return this;
  }

  /**
   * Set table with custom auto increment
   *
   * @param {number} [increment=1]
   * @returns this
   * @memberof Schema
   */
  setAutoIncrement(increment = 1) {
    Table.addConfig(`AUTO_INCREMENT = ${increment}`);
    return this;
  }

  /**
   * Set column to first position
   *
   * @returns this
   * @memberof Table
   */
  first() {
    const last = Table.getQueryLastBinding();

    connector.schemaBindings.commandModify.push(`${last.query} FIRST`);
    connector.schemaBindings.commandAdd.pop();
    return this;
  }

  /**
   * Set column index after set column
   * afterColumn can only be used if the statement is ALTER TABLE
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  afterColumn(column) {
    const last = Table.getQueryLastBinding();

    connector.schemaBindings.commandModify.push(`${last.query} AFTER ${column}`);
    connector.schemaBindings.commandAdd.pop();
    return this;
  }

  /**
   * Used to be modify available column
   *
   * @returns this
   * @memberof Table
   */
  change() {
    const last = Table.getQueryLastBinding();

    connector.schemaBindings.commandModify.push(last.query);
    connector.schemaBindings.commandAdd.pop();
    return this;
  }

  /**
   * This methods get column info from table and used results for change column name
   * with same data type from before. Data type will be taken when update table is running
   *
   * @param {string} from
   * @param {string} to
   * @returns this
   * @memberof Table
   */
  renameColumn(from, to) {
    const toSchema = Table.getSchema();

    const query = `ALTER TABLE ${toSchema} CHANGE COLUMN ${from} ${to}`;
    connector.schemaBindings.renameColumn.push(query);

    return this;
  }

  /**
   * Drop columns from database table
   *
   * @param {object} args
   * @returns this
   * @memberof Table
   */
  dropColumn(...args) {
    const toSchema = Table.getSchema();
    if (typeof args[0] === 'object') {
      args[0].forEach((column) => {
        connector.queries.push(`ALTER TABLE ${toSchema} DROP ${column}`);
      });
    }

    if (typeof args[0] === 'string') {
      connector.queries.push(`ALTER TABLE ${toSchema} DROP ${args[0]}`);
    }

    return this;
  }

  /**
   * Query foreign key
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  foreign(column) {
    const query = `FOREIGN KEY ${connector.schemaTable}_${column}_foreign(${column})`;

    if (connector.schemaBindings.statement[0] === 'CREATE TABLE') {
      connector.schemaBindings.commandAdd.push(query);
    }

    if (connector.schemaBindings.statement[0] === 'ALTER TABLE') {
      const toSchema = Table.getSchema();
      connector.queries.push(`ALTER TABLE ${toSchema} ADD ${query}`);
    }

    return this;
  }

  /**
   * Query references column for foreign key
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  references(column) {
    if (connector.schemaBindings.statement[0] === 'CREATE TABLE') {
      Table.pushToLastBinding(`REFERENCES ? (${column})`);
    }

    if (connector.schemaBindings.statement[0] === 'ALTER TABLE') {
      Table.pushToLastBinding(`REFERENCES ? (${column})`, 'queries');
    }

    return this;
  }

  /**
   * Query references table
   *
   * @param {string} table
   * @returns this
   * @memberof Table
   */
  on(table) {
    if (connector.schemaBindings.statement[0] === 'CREATE TABLE') {
      const last = Table.getQueryLastBinding();
      const query = last.query.replace('?', table);

      connector.schemaBindings.commandAdd[last.index] = query;
    }

    if (connector.schemaBindings.statement[0] === 'ALTER TABLE') {
      const last = Table.getQueryLastBinding('queries');
      const query = last.query.replace('?', table);

      connector.queries[last.index] = query;
    }

    return this;
  }

  /**
   * Query foreign key action ON UPDATE
   *
   * @param {string} action
   * @returns this
   * @memberof Table
   */
  onUpdate(action) {
    if (connector.schemaBindings.statement[0] === 'CREATE TABLE') {
      Table.pushToLastBinding(`ON UPDATE ${action}`);
    }

    if (connector.schemaBindings.statement[0] === 'ALTER TABLE') {
      Table.pushToLastBinding(`ON UPDATE ${action}`, 'queries');
    }

    return this;
  }

  /**
   * Query foreign key action ON DELETE
   *
   * @param {string} action
   * @returns this
   * @memberof Table
   */
  onDelete(action) {
    if (connector.schemaBindings.statement[0] === 'CREATE TABLE') {
      Table.pushToLastBinding(`ON DELETE ${action}`);
    }

    if (connector.schemaBindings.statement[0] === 'ALTER TABLE') {
      Table.pushToLastBinding(`ON DELETE ${action}`, 'queries');
    }

    return this;
  }

  /**
   * Drop foreign key from database table. Foreign key
   * drop by constraint name. Constraint name always use
   * _foreign after column name.
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  dropForeign(column) {
    const toSchema = Table.getSchema();
    connector.queries.push(`ALTER TABLE ${toSchema} DROP FOREIGN KEY ${connector.schemaTable}_${column}_foreign`);

    return this;
  }

  /**
   * Add query to schema bindings with binding command type
   *
   * @static
   * @param {string} query
   * @memberof Table
   */
  static addCommand(query) {
    connector.schemaBindings.commandAdd.push(`${query}`);
  }

  /**
   * Add query to schema bindings with binding config type
   *
   * @static
   * @param {string} query
   * @memberof Table
   */
  static addConfig(query) {
    connector.schemaBindings.config.push(query);
  }

  /**
   * Method to get database active
   *
   * @static
   * @returns string
   * @memberof Table
   */
  static getSchema() {
    const toSchema = `${connector.schemaConnection !== null ? `${connector.schemaConnection}.${connector.schemaTable}` : `${connector.schemaTable}`}`;
    return toSchema;
  }

  /**
   * Method used to get last query in schema binding
   *
   * @static
   * @returns string
   * @memberof Table
   */
  static getQueryLastBinding(type = 'commandAdd') {
    let lastBindingIndex = '';
    let lastQuery = '';

    if (type !== 'queries') {
      lastBindingIndex = (connector.schemaBindings[type].length - 1);
      lastQuery = connector.schemaBindings[type][lastBindingIndex];
    }

    if (type === 'queries') {
      lastBindingIndex = (connector.queries.length - 1);
      lastQuery = connector.queries[lastBindingIndex];
    }

    return {
      index: lastBindingIndex,
      query: lastQuery,
    };
  }

  /**
   * Compile query and push to last schema binding index
   *
   * @static
   * @param {string} extraQuery
   * @memberof Table
   */
  static pushToLastBinding(extraQuery, type = 'commandAdd') {
    const last = Table.getQueryLastBinding(type);

    if (type !== 'queries') {
      connector.schemaBindings[type][last.index] = `${last.query} ${extraQuery}`;
    }

    if (type === 'queries') {
      connector.queries[last.index] = `${last.query} ${extraQuery}`;
    }
  }
}

module.exports = new Table();
