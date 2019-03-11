const connector = require('../Connection/Connector');

class Table {
  /**
   * Set primary column with column type is integer and auto increment
   *
   * @param {string} [column='id']
   * @returns this
   * @memberof Table
   */
  tableIncrement(column = 'id') {
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
  tableTinyIncrement(column = 'id') {
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
  tableSmallIncrement(column = 'id') {
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
  tableMediumIncrement(column = 'id') {
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
  tableBigIncrement(column = 'id') {
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
  tableInteger(column) {
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
  tableTinyInteger(column) {
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
  tableSmallInteger(column) {
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
  tableMediumInteger(column) {
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
  tableBigInteger(column) {
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
  tableBinary(column) {
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
  tableBoolean(column) {
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
  tableChar(column, length = 100) {
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
  tableDate(column = 'created_at') {
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
  tableDateTime(column = 'created_at') {
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
  tableDecimal(column, precision = 8, scale = 2) {
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
  tableDouble(column, precision = 8, scale = 2) {
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
  tableEnum(column, defaults) {
    const arrDefault = [];
    defaults.forEach((value) => {
      if (typeof value === 'number') {
        arrDefault.push(value);
      }

      if (typeof value === 'string') {
        arrDefault.push(`'${value}'`);
      }
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
  tableFloat(column, precision = 8, scale = 2) {
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
  tableGeometry(column) {
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
  tableGeometryCollection(column) {
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
  tableIpAddress(column) {
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
  tableJson(column) {
    connector.schemaBindings.parenthesis.push(`${column} JSON`);
    return this;
  }

  /**
   * Set column with linestring type
   *
   * @param {string} column
   * @returns this
   * @memberof Table
   */
  tableLineString(column) {
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
  tableLongText(column) {
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
  tableMacAddress(column) {
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
  tableMediumText(column) {
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
  tableMultiLineString(column) {
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
  tableMultiPoint(column) {
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
  tableMultiPolygon(column) {
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
  tablePoint(column) {
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
  tablePolygon(column) {
    connector.schemaBindings.parenthesis.push(`${column} POLYGON`);
    return this;
  }

  /**
   * Set column remember_token with varchart type and length 100
   *
   * @returns this
   * @memberof Table
   */
  tableRememberToken() {
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
  tableString(column, length = 100) {
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
  tableText(column) {
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
  tableTime(column) {
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
  tableTimeStamp(column = 'added_on') {
    connector.schemaBindings.parenthesis.push(`${column} TIMESTAMP`);
    return this;
  }

  /**
   * Set column created_at and updated_at with timestamp type and null value
   *
   * @returns this
   * @memberof Table
   */
  tableTimestamps() {
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
  tableUnsignedBigInteger(column) {
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
  tableUnsignedDecimal(column, precision = 8, scale = 2) {
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
  tableUnsignedInteger(column) {
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
  tableUnsignedMediumInteger(column) {
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
  tableUnsignedSmallInteger(column) {
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
  tableUnsignedTinyInteger(column) {
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
  tableUuid(column = 'id') {
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
  tableYear(column) {
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
   * @returns
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

  /**
   * Compile query table
   *
   * @static
   * @returns string query
   * @memberof Table
   */
  static queryBuilder() {
    const query = `${connector.schemaBindings.statement.join(' ')} ${connector.schemaTable} (${connector.schemaBindings.parenthesis})`;

    return query;
  }

  /**
   * Processed schema query and return result
   *
   * @returns promise
   * @memberof Table
   */
  runSchema() {
    return new Promise((resolve) => {
      const query = Table.queryBuilder();
      resolve(query);
    });
  }
}

module.exports = new Table();
