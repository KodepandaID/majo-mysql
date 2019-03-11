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
    connector.schemaBindings.parenthesis.push(`${column} INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY`);
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
    connector.schemaBindings.parenthesis.push(`${column} TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY`);
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
    connector.schemaBindings.parenthesis.push(`${column} SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY`);
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
    connector.schemaBindings.parenthesis.push(`${column} MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY`);
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
    connector.schemaBindings.parenthesis.push(`${column} BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY`);
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
    connector.schemaBindings.parenthesis.push(`${column} INT`);
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
    connector.schemaBindings.parenthesis.push(`${column} TINYINT`);
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
    connector.schemaBindings.parenthesis.push(`${column} SMALLINT`);
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
    connector.schemaBindings.parenthesis.push(`${column} MEDIUMINT`);
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
    connector.schemaBindings.parenthesis.push(`${column} BIGINT`);
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
    connector.schemaBindings.parenthesis.push(`${column} BINARY`);
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
    connector.schemaBindings.parenthesis.push(`${column} BOOL`);
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
    connector.schemaBindings.parenthesis.push(`${column} CHAR(${length})`);
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
    connector.schemaBindings.parenthesis.push(`${column} DATE`);
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
    connector.schemaBindings.parenthesis.push(`${column} DATETIME`);
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
    connector.schemaBindings.parenthesis.push(`${column} DECIMAL(${precision}, ${scale})`);
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
    connector.schemaBindings.parenthesis.push(`${column} DOUBLE(${precision}, ${scale})`);
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

    connector.schemaBindings.parenthesis.push(`${column} ENUM(${arrDefault.join(', ')})`);
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
    connector.schemaBindings.parenthesis.push(`${column} FLOAT(${precision}, ${scale})`);
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
    connector.schemaBindings.parenthesis.push(`${column} GEOMETRY`);
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
    connector.schemaBindings.parenthesis.push(`${column} GEOMETRYCOLLECTION`);
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
    connector.schemaBindings.parenthesis.push(`${column} VARCHAR(45)`);
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
    connector.schemaBindings.parenthesis.push(`${column} LONGTEXT`);
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
    connector.schemaBindings.parenthesis.push(`${column} LINESTRING`);
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
    connector.schemaBindings.parenthesis.push(`${column} LONGTEXT`);
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
    connector.schemaBindings.parenthesis.push(`${column} VARCHAR(17)`);
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
    connector.schemaBindings.parenthesis.push(`${column} MEDIUMTEXT`);
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
    connector.schemaBindings.parenthesis.push(`${column} MULTILINESTRING`);
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
    connector.schemaBindings.parenthesis.push(`${column} MULTIPOINT`);
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
    connector.schemaBindings.parenthesis.push(`${column} MULTIPOLYGON`);
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
    connector.schemaBindings.parenthesis.push(`${column} POINT`);
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
    connector.schemaBindings.parenthesis.push(`${column} POLYGON`);
    return this;
  }

  /**
   * Set column remember_token with varchart type and length 100
   *
   * @returns this
   * @memberof Table
   */
  rememberToken() {
    connector.schemaBindings.parenthesis.push('remember_token VARCHAR(100)');
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
    connector.schemaBindings.parenthesis.push(`${column} VARCHAR(${length})`);
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
    connector.schemaBindings.parenthesis.push(`${column} TEXT`);
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
    connector.schemaBindings.parenthesis.push(`${column} TIME`);
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
    connector.schemaBindings.parenthesis.push(`${column} TIMESTAMP`);
    return this;
  }

  /**
   * Set column created_at and updated_at with timestamp type and null value
   *
   * @returns this
   * @memberof Table
   */
  timestamps() {
    connector.schemaBindings.parenthesis.push('created_at TIMESTAMP NULL');
    connector.schemaBindings.parenthesis.push('updated_at TIMESTAMP NULL');
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
    connector.schemaBindings.parenthesis.push(`${column} BIGINT UNSIGNED`);
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
    connector.schemaBindings.parenthesis.push(`${column} DECIMAL(${precision}, ${scale}) UNSIGNED`);
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
    connector.schemaBindings.parenthesis.push(`${column} INT UNSIGNED`);
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
    connector.schemaBindings.parenthesis.push(`${column} MEDIUMINT UNSIGNED`);
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
    connector.schemaBindings.parenthesis.push(`${column} SMALLINT UNSIGNED`);
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
    connector.schemaBindings.parenthesis.push(`${column} TINYINT UNSIGNED`);
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
    connector.schemaBindings.parenthesis.push(`${column} CHAR(36)`);
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
    connector.schemaBindings.parenthesis.push(`${column} YEAR`);
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
    if (connector.schemaBindings.statement[0] === 'ALTER TABLE') {
      Table.pushToLastBinding(`AFTER ${column}`, 'parenthesis');
    }
    return this;
  }

  /**
   * Set column with auto increment primary key
   *
   * @returns this
   * @memberof Table
   */
  autoIncrement() {
    Table.pushToLastBinding('AUTO_INCREMENT PRIMARY KEY', 'parenthesis');
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
    Table.pushToLastBinding(`CHARACTER SET ${character}`, 'parenthesis');
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
    Table.pushToLastBinding(`COLLATE ${collate}`, 'parenthesis');
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
    Table.pushToLastBinding(`COMMENT '${commentText}'`, 'parenthesis');
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
    Table.pushToLastBinding(`DEFAULT ${typeof value === 'string' ? `'${value}'` : value}`, 'parenthesis');
    return this;
  }

  /**
   * Set column to first position
   *
   * @returns this
   * @memberof Table
   */
  first() {
    if (connector.schemaBindings.statement[0] === 'ALTER TABLE') {
      Table.pushToLastBinding('FIRST', 'parenthesis');
    }

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
      Table.pushToLastBinding('NULL', 'parenthesis');
    }

    if (value === false) {
      Table.pushToLastBinding('NOT NULL', 'parenthesis');
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
    Table.pushToLastBinding('UNSIGNED', 'parenthesis');
    return this;
  }

  /**
   * Set timestamp column with default value current timestamp
   *
   * @returns
   * @memberof Table
   */
  useCurrent() {
    Table.pushToLastBinding('DEFAULT CURRENT_TIMESTAMP', 'parenthesis');
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
    connector.schemaBindings.nonParenthesis.push(`ENGINE = ${engine}`);
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
    connector.schemaBindings.nonParenthesis.push(`DEFAULT CHARSET = ${charset}`);
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
    connector.schemaBindings.nonParenthesis.push(`COLLATE = ${collate}`);
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
    connector.schemaBindings.nonParenthesis.push(`COMMENT = '${comment}'`);
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
    connector.schemaBindings.nonParenthesis.push(`AUTO_INCREMENT = ${increment}`);
    return this;
  }

  /**
   * Compile query and push to last schema binding index
   *
   * @static
   * @param {string} extraQuery
   * @param {string} typeBinding
   * @returns this
   * @memberof Table
   */
  static pushToLastBinding(extraQuery, typeBinding) {
    const lastBindingIndex = (connector.schemaBindings[typeBinding].length - 1);
    const lastQuery = connector.schemaBindings[typeBinding][lastBindingIndex];

    connector.schemaBindings[typeBinding][lastBindingIndex] = `${lastQuery} ${extraQuery}`;
    return this;
  }
}

module.exports = new Table();
