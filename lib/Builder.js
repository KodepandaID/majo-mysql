const Connector = require('./Connection/Connector');
const Compiler = require('./Grammar/Compiler');
const JoinClause = require('./Grammar/JoinClause');
const Relationships = require('./Relationships/Relationships');

class Builder {
  /**
   * Configuration of database
   *
   * @param {object} config
   * @returns this
   * @memberof Builder
   */
  connection(config) {
    Connector.connection = config;

    return this;
  }

  /**
   * Create select query
   *
   * @param {object} args
   * @returns this
   * @memberof Builder
   */
  select(...args) {
    Connector.bindings.select.push(args.length === 0 ? '*' : args.join(', '));

    return this;
  }

  /**
   * Create query select average
   *
   * @param {string} column
   * @param {string} [asColumn=null]
   * @returns this
   * @memberof Builder
   */
  avg(column, asColumn = null) {
    Connector.bindings.select.push(`AVG(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

    return this;
  }

  /**
   * Create query select count
   *
   * @param {string} [column='*']
   * @param {string} [asColumn=null]
   * @returns this
   * @memberof Builder
   */
  count(column = '*', asColumn = null) {
    Connector.bindings.select.push(`COUNT(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

    return this;
  }

  /**
   * Create query select count with distinct for spesific column
   *
   * @param {string} [column='*']
   * @param {*} [asColumn=null]
   * @returns this
   * @memberof Builder
   */
  countDistinct(column = '*', asColumn = null) {
    Connector.bindings.select.push(`COUNT(DISTINCT ${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

    return this;
  }

  /**
   * Create query select sum
   *
   * @param {string} column
   * @param {string} [asColumn=null]
   * @returns this
   * @memberof Builder
   */
  sum(column, asColumn = null) {
    Connector.bindings.select.push(`SUM(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

    return this;
  }

  /**
   * Create query select min
   *
   * @param {string} column
   * @param {string} [asColumn=null]
   * @returns this
   * @memberof Builder
   */
  min(column, asColumn = null) {
    Connector.bindings.select.push(`MIN(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

    return this;
  }

  /**
   * Create query select max
   *
   * @param {string} column
   * @param {string} [asColumn=null]
   * @returns this
   * @memberof Builder
   */
  max(column, asColumn = null) {
    Connector.bindings.select.push(`MAX(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

    return this;
  }

  /**
   * Create query select distinct
   *
   * @returns this
   * @memberof Builder
   */
  distinct() {
    Connector.selectDistinct = true;

    return this;
  }

  /**
   * Create query from table
   *
   * @param {string} args
   * @returns this
   * @memberof Builder
   */
  from(args) {
    Connector.tables = args;
    Connector.bindings.from.push(args);

    return this;
  }

  /**
   * Create query to table
   *
   * @param {string} tableName
   * @returns this
   * @memberof Builder
   */
  table(tableName) {
    Connector.tables = tableName;
    Connector.bindings.from.push(tableName);

    return this;
  }

  /**
   * Create query join table
   *
   * @param {string} table
   * @param {string} joinColumn
   * @param {string} [operator=null]
   * @param {string} [selectColumn=null]
   * @param {string} [type='inner']
   * @returns this
   * @memberof Builder
   */
  join(table, joinColumn, operator = null, selectColumn = null, type = 'inner') {
    const query = JoinClause.buildJoin(table, joinColumn, operator, selectColumn, type);
    Connector.bindings.join.push(query);

    return this;
  }

  /**
   * Create query left join
   *
   * @param {string} table
   * @param {string} joinColumn
   * @param {string} [operator='=']
   * @param {string} [selectColumn=null]
   * @returns this
   * @memberof Builder
   */
  leftJoin(table, joinColumn, operator = '=', selectColumn = null) {
    this.join(table, joinColumn, operator, selectColumn, 'left');

    return this;
  }

  /**
   * Create query left outer join
   *
   * @param {string} table
   * @param {string} joinColumn
   * @param {string} [operator='=']
   * @param {string} [selectColumn=null]
   * @returns this
   * @memberof Builder
   */
  leftOuterJoin(table, joinColumn, operator = '=', selectColumn = null) {
    this.join(table, joinColumn, operator, selectColumn, 'left outer');

    return this;
  }

  /**
   * Create query right join
   *
   * @param {string} table
   * @param {string} joinColumn
   * @param {string} [operator='=']
   * @param {string} [selectColumn=null]
   * @returns this
   * @memberof Builder
   */
  rightJoin(table, joinColumn, operator = '=', selectColumn = null) {
    this.join(table, joinColumn, operator, selectColumn, 'right');

    return this;
  }

  /**
   * Create query right outer join
   *
   * @param {string} table
   * @param {string} joinColumn
   * @param {string} [operator='=']
   * @param {string} [selectColumn=null]
   * @returns this
   * @memberof Builder
   */
  rightOuterJoin(table, joinColumn, operator = '=', selectColumn = null) {
    this.join(table, joinColumn, operator, selectColumn, 'right outer');

    return this;
  }

  /**
   * Create query inner join
   *
   * @param {string} table
   * @param {string} joinColumn
   * @param {string} [operator='=']
   * @param {string} [selectColumn=null]
   * @returns this
   * @memberof Builder
   */
  innerJoin(table, joinColumn, operator = '=', selectColumn = null) {
    this.join(table, joinColumn, operator, selectColumn, 'inner');

    return this;
  }

  /**
   * Create query cross join
   *
   * @param {string} table
   * @param {string} joinColumn
   * @param {string} [operator='=']
   * @param {string} [selectColumn=null]
   * @param {string} [type='cross']
   * @returns this
   * @memberof Builder
   */
  crossJoin(table, joinColumn, operator = '=', selectColumn = null, type = 'cross') {
    this.join(table, joinColumn, operator, selectColumn, type);

    return this;
  }

  /**
   * Create query join from raw string
   *
   * @param {string} raw
   * @returns this
   * @memberof Builder
   */
  joinRaw(raw) {
    Connector.bindings.join.push(raw);

    return this;
  }

  /**
   * Create query where
   *
   * @param {object} args
   * @returns this
   * @memberof Builder
   */
  where(...args) {
    // If argument is object
    if (typeof args[0] === 'object') {
      Builder.whereArrayProcess(args[0]);
    }

    // If argument use field and value without operator
    if (args.length === 2) {
      Builder.whereValue(args[0], args[1]);
    }

    // If argument use field, value and operator not available
    if (args.length === 3 && !Builder.invalidWhereOperator(args[1])) {
      Builder.whereValueAndOperator(args[0], '=', args[2], 'where');
    }

    // If argument use field, value and operator is available
    if (args.length === 3 && Builder.invalidWhereOperator(args[1])) {
      Builder.whereValueAndOperator(args[0], args[1], args[2], 'where');
    }

    return this;
  }

  /**
   * Create query and where
   *
   * @param {object} args
   * @returns this
   * @memberof Builder
   */
  andWhere(...args) {
    this.where(args);

    return this;
  }

  /**
   * Create query or where
   *
   * @param {object} args
   * @returns this
   * @memberof Builder
   */
  orWhere(...args) {
    // If argument is object
    if (typeof args[0] === 'object') {
      Builder.whereArrayProcess(args[0], 'orWhere');
    }

    // If argument use field and value without operator
    if (args.length === 2) {
      Builder.whereValue(args[0], args[1], 'orWhere');
    }

    // If argument use field, value and operator not available
    if (args.length === 3 && !Builder.invalidWhereOperator(args[1])) {
      Builder.whereValueAndOperator(args[0], '=', args[2], 'orWhere');
    }

    // If argument use field, value and operator is available
    if (args.length === 3 && Builder.invalidWhereOperator(args[1])) {
      Builder.whereValueAndOperator(args[0], args[1], args[2], 'orWhere');
    }

    return this;
  }

  /**
   * Create query or where
   *
   * @param {object} args
   * @returns this
   * @memberof Builder
   */
  andOrWhere(...args) {
    // If argument is object
    if (typeof args[0] === 'object') {
      Builder.whereArrayProcess(args[0], 'orWhere', 'value', 'and');
    }

    // If argument use field and value without operator
    if (args.length === 2) {
      Builder.whereValue(args[0], args[1], 'orWhere', 'value', 'and');
    }

    // If argument use field, value and operator not available
    if (args.length === 3 && !Builder.invalidWhereOperator(args[1])) {
      Builder.whereValueAndOperator(args[0], '=', args[2], 'orWhere', 'value', 'and');
    }

    // If argument use field, value and operator is available
    if (args.length === 3 && Builder.invalidWhereOperator(args[1])) {
      Builder.whereValueAndOperator(args[0], args[1], args[2], 'orWhere', 'value', 'and');
    }

    return this;
  }

  /**
   * Create query where from raw string
   *
   * @param {string} raw
   * @returns this
   * @memberof Builder
   */
  whereRaw(raw) {
    Connector.bindings.where.push(raw);

    return this;
  }

  /**
   * Create query where value in
   *
   * @param {object} args
   * @returns this
   * @memberof Builder
   */
  whereIn(...args) {
    if (Array.isArray(args[1])) {
      Builder.whereInArrayValue(args[0], args[1]);
    }

    if (typeof args[1] === 'string') {
      Connector.bindings.where.push(`${args[0]} IN ('${args[1]}')`);
    }

    if (typeof args[1] === 'number') {
      Connector.bindings.where.push(`${args[0]} IN (${args[1]})`);
    }

    if (args[1] === null) {
      Connector.bindings.where.push(`${args[0]} IN (NULL)`);
    }

    return this;
  }

  /**
   * Create query where value not in
   *
   * @param {object} args
   * @returns this
   * @memberof Builder
   */
  whereNotIn(...args) {
    // If second argument is array
    if (Array.isArray(args[1])) {
      Builder.whereNotInArrayValue(args[0], args[1]);
    }

    // If second argument is string
    if (typeof args[1] === 'string') {
      Connector.bindings.where.push(`${args[0]} NOT IN ('${args[1]}')`);
    }

    // If second argument is number
    if (typeof args[1] === 'number') {
      Connector.bindings.where.push(`${args[0]} NOT IN (${args[1]})`);
    }

    // if second argument is null
    if (args[1] === null) {
      Connector.bindings.where.push(`${args[0]} NOT IN (NULL)`);
    }

    return this;
  }

  /**
   * Create query where value is null
   *
   * @param {string} column
   * @returns this
   * @memberof Builder
   */
  whereNull(column) {
    this.where(column, null);

    return this;
  }

  /**
   * Create query where value is not null
   *
   * @param {string} column
   * @returns this
   * @memberof Builder
   */
  whereNotNull(column) {
    Connector.bindings.where.push(`${column} IS NOT NULL`);

    return this;
  }

  /**
   * Create query where value is empty string
   *
   * @param {string} column
   * @returns this
   * @memberof Builder
   */
  whereEmptyString(column) {
    Connector.bindings.where.push(`${column} = ''`);

    return this;
  }

  /**
   * Create query where between value
   *
   * @param {string} column
   * @param {number} start
   * @param {number} end
   * @param {string} [whereClause='where']
   * @returns this
   * @memberof Builder
   */
  whereBetween(column, start, end, whereClause = 'where') {
    Connector.bindings[whereClause].push(`${column} BETWEEN ${start} AND ${end}`);

    return this;
  }

  /**
   * Create query where not between value
   *
   * @param {string} column
   * @param {number} start
   * @param {number} end
   * @param {string} [whereClause='where']
   * @returns this
   * @memberof Builder
   */
  whereNotBetween(column, start, end, whereClause = 'where') {
    Connector.bindings[whereClause].push(`${column} NOT BETWEEN ${start} AND ${end}`);

    return this;
  }

  /**
   * Create query or where between value
   *
   * @param {string} column
   * @param {number} start
   * @param {number} end
   * @returns this
   * @memberof Builder
   */
  orWhereBetween(column, start, end) {
    this.whereBetween(column, start, end, 'orWhere');

    return this;
  }

  /**
   * Create query or where not between value
   *
   * @param {string} column
   * @param {number} start
   * @param {number} end
   * @returns this
   * @memberof Builder
   */
  orWhereNotBetween(column, start, end) {
    this.whereNotBetween(column, start, end, 'orWhere');

    return this;
  }

  /**
   * Create query where same value in different column
   *
   * @param {object} args
   * @returns this
   * @memberof Builder
   */
  whereColumn(...args) {
    // If argument is object
    if (typeof args[0] === 'object') {
      Builder.whereArrayProcess(args[0], 'where', 'column');
    }

    // If argument use field and value without operator
    if (args.length === 2) {
      Builder.whereValue(args[0], args[1], 'where', 'column');
    }

    // If argument use field, value and operator
    if (args.length === 3) {
      Builder.whereValueAndOperator(args[0], args[1], args[2], 'where', 'column');
    }

    return this;
  }

  /**
   * Create query or where same value in different column
   *
   * @param {object} args
   * @returns this
   * @memberof Builder
   */
  orWhereColumn(...args) {
    // If argument is object
    if (typeof args[0] === 'object') {
      Builder.whereArrayProcess(args[0], 'orWhere', 'column');
    }

    // If argument use field and value without operator
    if (args.length === 2) {
      Builder.whereValue(args[0], args[1], 'orWhere', 'column');
    }

    // If argument use field, value and operator
    if (args.length === 3) {
      Builder.whereValueAndOperator(args[0], args[1], args[2], 'orWhere', 'column');
    }

    return this;
  }

  /**
   * Create where exists query
   *
   * @returns this
   * @memberof Builder
   */
  whereExists() {
    Connector.multipleQuery = true;

    const query = Builder.queryBuilder();
    Connector.queries.push(query);
    Connector.queries.push('WHERE EXISTS');
    Connector.queries.push('(');

    Connector.resetBinding();
    return this;
  }

  /**
   * Create where not exists query
   *
   * @returns this
   * @memberof Builder
   */
  whereNotExists() {
    Connector.multipleQuery = true;

    const query = Builder.queryBuilder();
    Connector.queries.push(query);
    Connector.queries.push('WHERE NOT EXISTS');
    Connector.queries.push('(');

    Connector.resetBinding();
    return this;
  }

  /**
   * Create query where, if use where much column
   *
   * Argument whereType is used to determine the value
   * is a column or not
   *
   * @static
   * @param {array} column
   * @param {string} [whereClauses='where']
   * @param {string} [whereType='value']
   * @param {string} [andWhere=null]
   * @memberof Builder
   */
  static whereArrayProcess(column, whereClauses = 'where', whereType = 'value', andWhere = null) {
    const arr = Object.keys(column);

    arr.forEach((data) => {
      const value = typeof column[data] !== 'string' || whereType === 'column' ? column[data] : `'${column[data]}'`;
      if (andWhere === null) Connector.bindings[whereClauses].push(`${data} = ${value}`);
      else {
        const lastWhereIndex = Connector.bindings[whereClauses].length - 1;
        const lastWhere = Connector.bindings[whereClauses][lastWhereIndex];
        Connector.bindings[whereClauses][lastWhereIndex] = `${lastWhere} AND ${data} = ${value}`;
      }
    });
  }

  /**
   * Create query where in value, if use much value
   *
   * @static
   * @param {string} column
   * @param {array} values
   * @memberof Builder
   */
  static whereInArrayValue(column, values) {
    const arr = [];
    values.forEach((data) => {
      if (typeof data === 'string') {
        arr.push(`'${data}'`);
      } else {
        arr.push(data);
      }
    });

    Connector.bindings.where.push(`${column} IN (${arr.join(', ')})`);
  }

  /**
   * Create query where not in value, if use much value
   *
   * @static
   * @param {string} column
   * @param {array} values
   * @memberof Builder
   */
  static whereNotInArrayValue(column, values) {
    const arr = [];
    values.forEach((data) => {
      if (typeof data === 'string') {
        arr.push(`'${data}'`);
      } else {
        arr.push(data);
      }
    });
    Connector.bindings.where.push(`${column} NOT IN (${arr.join(', ')})`);
  }

  /**
   * Create query where, if use single field and value
   *
   * Argument whereType is used to determine the value
   * is a column or not
   *
   * @static
   * @param {string} column
   * @param {string / number} value
   * @param {string} [whereClauses='where']
   * @param {string} [whereType='value']
   * @param {string} [andWhere=null]
   * @memberof Builder
   */
  static whereValue(column, value, whereClauses = 'where', whereType = 'value', andWhere = null) {
    const valueFinal = typeof value !== 'string' || whereType === 'column' ? value : `'${value}'`;
    if (valueFinal === null) {
      if (andWhere === null) Connector.bindings[whereClauses].push(`${column} IS NULL`);
      else {
        const lastWhereIndex = Connector.bindings[whereClauses].length - 1;
        const lastWhere = Connector.bindings[whereClauses][lastWhereIndex];
        Connector.bindings[whereClauses][lastWhereIndex] = `${lastWhere} AND ${column} IS NULL`;
      }
    }

    if (valueFinal !== null) {
      if (andWhere === null) Connector.bindings[whereClauses].push(`${column} = ${valueFinal}`);
      else {
        const lastWhereIndex = Connector.bindings[whereClauses].length - 1;
        const lastWhere = Connector.bindings[whereClauses][lastWhereIndex];
        Connector.bindings[whereClauses][lastWhereIndex] = `${lastWhere} AND ${column} = ${valueFinal}`;
      }
    }
  }

  /**
   * Create query where with operator
   *
   * Argument whereType is used to determine the value
   * is a column or not
   *
   * @static
   * @param {string} column
   * @param {string} operator
   * @param {string / number} value
   * @param {string} [whereClauses='where']
   * @param {string} [whereType='value']
   * @param {string} [andWhere=null]
   * @memberof Builder
   */
  static whereValueAndOperator(column, operator, value, whereClauses = 'where', whereType = 'value', andWhere = null) {
    const valueFinal = typeof value !== 'string' || whereType === 'column' ? value : `'${value}'`;
    if (andWhere === null) Connector.bindings[whereClauses].push(`${column} ${operator} ${valueFinal}`);
    else {
      const lastWhereIndex = Connector.bindings[whereClauses].length - 1;
      const lastWhere = Connector.bindings[whereClauses][lastWhereIndex];
      Connector.bindings[whereClauses][lastWhereIndex] = `${lastWhere} AND ${column} ${operator} ${valueFinal}`;
    }
  }

  /**
   * Check the operator available or not
   *
   * @static
   * @param {string} operator
   * @returns
   * @memberof Builder
   */
  static invalidWhereOperator(operator) {
    let invalid = false;
    if (Connector.operators.includes(operator)) {
      invalid = true;
    }

    return invalid;
  }

  /**
   * Create query order by column, with custom sorting, asc or desc
   *
   * @param {string} column
   * @param {string} [direction='asc']
   * @returns this
   * @memberof Builder
   */
  orderBy(column, direction = 'asc') {
    Connector.bindings.order.push(`${column} ${direction.toUpperCase()}`);

    return this;
  }

  /**
   * Create query order by descending
   *
   * @param {string} column
   * @returns this
   * @memberof Builder
   */
  orderByDesc(column) {
    Connector.bindings.order.push(`${column} DESC`);

    return this;
  }

  /**
   * Create query order by column descending
   *
   * @param {string} [column='created_date']
   * @returns this
   * @memberof Builder
   */
  latest(column = 'created_date') {
    Connector.bindings.order.push(`${column} DESC`);

    return this;
  }

  /**
   * Create query order by column ascending
   *
   * @param {string} [column='created_date']
   * @returns this
   * @memberof Builder
   */
  oldest(column = 'created_date') {
    Connector.bindings.order.push(`${column} ASC`);

    return this;
  }

  /**
   * Create query order by with raw text
   *
   * @param {string} query
   * @returns this
   * @memberof Builder
   */
  orderByRaw(query) {
    query.replace(/order by/g, '');
    query.replace(/ORDER BY/g, '');
    Connector.bindings.order.push(query);

    return this;
  }

  /**
   * Create query group by column
   *
   * @param {array} args
   * @returns this
   * @memberof Builder
   */
  groupBy(...args) {
    args.forEach((data) => {
      Connector.bindings.group.push(data);
    });

    return this;
  }

  /**
   * Create query group by column, with raw text
   *
   * @param {string} raw
   * @returns this
   * @memberof Builder
   */
  groupByRaw(raw) {
    Connector.bindings.group.push(raw);

    return this;
  }

  /**
   * Create sub query of group by, with having conditions
   *
   * @param {array} args
   * @returns this
   * @memberof Builder
   */
  having(...args) {
    // If argument field and value
    if (args.length === 2) {
      Builder.havingValue(args[0], args[1]);
    }

    // If argument with operator
    if (args.length === 3) {
      Builder.havingValueAndOperator(args[0], args[1], args[2]);
    }

    return this;
  }

  /**
   * Create query having in value
   *
   * @param {string} column
   * @param {array} value
   * @returns this
   * @memberof Builder
   */
  havingIn(column, value) {
    Builder.havingValueAndOperator(column, 'IN', value);
    return this;
  }

  /**
   * Create query having not in value
   *
   * @param {string} column
   * @param {string} value
   * @returns this
   * @memberof Builder
   */
  havingNotIn(column, value) {
    Builder.havingValueAndOperator(column, 'NOT IN', value);
    return this;
  }

  /**
   * Create query having null value
   *
   * @param {string} column
   * @returns this
   * @memberof Builder
   */
  havingNull(column) {
    Builder.havingValueAndOperator(column, 'IS', null);
    return this;
  }

  /**
   * Create query having is not null value
   *
   * @param {string} column
   * @returns this
   * @memberof Builder
   */
  havingNotNull(column) {
    Builder.havingValueAndOperator(column, 'IS NOT', null);
    return this;
  }

  /**
   * Create query having column between value
   *
   * @param {string} column
   * @param {number} [start=0]
   * @param {number} [end=0]
   * @returns this
   * @memberof Builder
   */
  havingBetween(column, start = 0, end = 0) {
    Connector.bindings.having.push(`${column} BETWEEN ${start} AND ${end}`);
    return this;
  }

  /**
   * Create query having column not between value
   *
   * @param {string} column
   * @param {number} [start=0]
   * @param {number} [end=0]
   * @returns this
   * @memberof Builder
   */
  havingNotBetween(column, start = 0, end = 0) {
    Connector.bindings.having.push(`${column} NOT BETWEEN ${start} AND ${end}`);
    return this;
  }

  /**
   * Create query having exists
   *
   * @returns this
   * @memberof Builder
   */
  havingExists() {
    Connector.multipleQuery = true;

    const query = Builder.queryBuilder();
    Connector.queries.push(query);
    Connector.queries.push('HAVING EXISTS');
    Connector.queries.push('(');

    Connector.resetBinding();
    return this;
  }

  /**
   * Create query having not exists
   *
   * @returns this
   * @memberof Builder
   */
  havingNotExists() {
    Connector.multipleQuery = true;

    const query = Builder.queryBuilder();
    Connector.queries.push(query);
    Connector.queries.push('HAVING NOT EXISTS');
    Connector.queries.push('(');

    Connector.resetBinding();
    return this;
  }

  /**
   * Added operator '=' if having condition not use operator
   *
   * @static
   * @param {string} column
   * @param {string} value
   * @memberof Builder
   */
  static havingValue(column, value) {
    Builder.havingValueAndOperator(column, '=', value);
  }

  /**
   * Create query having condition with operator
   *
   * @static
   * @param {string} column
   * @param {string} operator
   * @param {string} value
   * @memberof Builder
   */
  static havingValueAndOperator(column, operator, value) {
    // If value is not string or operator is null or is not null
    if (typeof value !== 'string' && typeof value !== 'object') {
      Connector.bindings.having.push(`${column} ${operator} ${value}`);
    }

    // If value is string
    if (typeof value === 'string') {
      Connector.bindings.having.push(`${column} ${operator} '${value}'`);
    }

    // If value is object
    if (typeof value === 'object') {
      if (operator.includes(Connector.operators) || operator.includes('IS')) {
        Connector.bindings.having.push(`${column} ${operator} ${value === null ? 'NULL' : value.join(', ')}`);
      }

      if (!operator.includes(Connector.operators) && !operator.includes('IS')) {
        Connector.bindings.having.push(`${column} ${operator} (${value === null ? 'NULL' : value.join(', ')})`);
      }
    }
  }

  /**
   * Create query offset return
   *
   * @param {number} value
   * @returns this
   * @memberof Builder
   */
  skip(value) {
    this.offset(value);

    return this;
  }

  /**
   * Create query offset return
   *
   * @param {number} [value=0]
   * @returns this
   * @memberof Builder
   */
  offset(value = 0) {
    Connector.bindings.mix.push(`OFFSET ${value}`);

    return this;
  }

  /**
   * Create query limit return
   *
   * @param {number} value
   * @returns this
   * @memberof Builder
   */
  take(value) {
    this.limit(value);

    return this;
  }

  /**
   * Create query limit return
   *
   * @param {number} [value=0]
   * @returns this
   * @memberof Builder
   */
  limit(value = 0) {
    if (value > 0) {
      Connector.bindings.mix.push(`LIMIT ${value}`);
    }

    return this;
  }

  /**
   * Create query increment value
   *
   * @param {object} args
   * @returns promise
   * @memberof Builder
   */
  increment(...args) {
    return new Promise((resolve, reject) => {
      Builder.queryWhereBuilder();

      // If argument is object
      if (typeof args[0] === 'object') {
        Connector.updateGrammar = Compiler.compileIncrementArray(Connector.tables, args[0]);
      }

      // If argument not object and not set value increment
      if (typeof args[0] !== 'object' && args.length === 1) {
        Connector.updateGrammar = Compiler.compileIncrement(Connector.tables, args[0], 1);
      }

      // If argument not object and use value increment
      if (typeof args[0] !== 'object' && args.length === 2) {
        Connector.updateGrammar = Compiler.compileIncrement(Connector.tables, args[0], args[1]);
      }

      Connector.updateGrammar = `${Connector.updateGrammar} ${Connector.whereGrammar}`;

      Connector
        .update()
        .then(() => {
          resolve();
        })
        .catch((err) => /* istanbul ignore next */ {
          reject(err);
        });

      Connector.resetBinding();
      return this;
    });
  }

  /**
   * Create query decrement value
   *
   * @param {object} args
   * @returns this
   * @memberof Builder
   */
  decrement(...args) {
    return new Promise((resolve, reject) => {
      Builder.queryWhereBuilder();

      // If argument is object
      if (typeof args[0] === 'object') {
        Connector.updateGrammar = Compiler.compileDecrementArray(Connector.tables, args[0]);
      }

      // If argument not object and not set value increment
      if (typeof args[0] !== 'object' && args.length === 1) {
        Connector.updateGrammar = Compiler.compileDecrement(Connector.tables, args[0], 1);
      }

      // If argument not object and use value increment
      if (typeof args[0] !== 'object' && args.length === 2) {
        Connector.updateGrammar = Compiler.compileDecrement(Connector.tables, args[0], args[1]);
      }

      Connector.updateGrammar = `${Connector.updateGrammar}${Connector.whereGrammar !== '' ? ` ${Connector.whereGrammar}` : ''}`;

      Connector
        .update()
        .then(() => {
          resolve();
        })
        .catch(/* istanbul ignore next */ (err) => {
          reject(err);
        });

      Connector.resetBinding();
      return this;
    });
  }

  /**
   * Create query insert to column
   *
   * @param {array} args
   * @returns promise
   * @memberof Builder
   */
  insert(...args) {
    return new Promise((resolve, reject) => {
      if (args.length === 1 && !args[0].length) {
        Connector.insertGrammar = Compiler.compileInsert(Connector.tables, args[0]);
      } else {
        Connector.insertGrammar = Compiler.compileInsertArray(Connector.tables, args[0]);
      }

      Connector
        .insert()
        .then(() => {
          resolve();
        })
        .catch(/* istanbul ignore next */ (err) => {
          reject(err);
        });

      Connector.resetBinding();
      return this;
    });
  }

  /**
   * Create query insert to column and return id
   *
   * @param {array} args
   * @returns promise
   * @memberof Builder
   */
  insertGetId(...args) {
    return new Promise((resolve, reject) => {
      if (args.length === 1 && !args[0].length) {
        Connector.insertGrammar = Compiler.compileInsert(Connector.tables, args[0]);
      } else {
        Connector.insertGrammar = Compiler.compileInsertArray(Connector.tables, args[0]);
      }

      Connector
        .insertGetId()
        .then((insertId) => {
          resolve(insertId);
        })
        .catch(/* istanbul ignore next */ (err) => {
          reject(err);
        });

      Connector.resetBinding();
      return this;
    });
  }

  /**
   * Create query update set column
   *
   * @param {array} args
   * @returns this
   * @memberof Builder
   */
  update(...args) {
    return new Promise((resolve, reject) => {
      Builder.queryWhereBuilder();

      if (typeof args[0] === 'string') {
        Connector.updateGrammar = Compiler.compileUpdate(Connector.tables, args[0], args[1]);
      }

      if (typeof args[0] === 'object') {
        Connector.updateGrammar = Compiler.compileUpdateArray(Connector.tables, args);
      }

      Connector.updateGrammar = `${Connector.updateGrammar}${Connector.whereGrammar !== '' ? ` ${Connector.whereGrammar}` : ''}`;

      Connector
        .update()
        .then(() => {
          resolve();
        })
        .catch(/* istanbul ignore next */ (err) => {
          reject(err);
        });

      Connector.resetBinding();
      return this;
    });
  }

  /**
   * Create query delete
   *
   * @returns this
   * @memberof Builder
   */
  delete() {
    return new Promise((resolve, reject) => {
      Builder.queryWhereBuilder();

      Connector.deleteGrammar = Compiler.compileDelete(Connector.tables);
      Connector.deleteGrammar = `${Connector.deleteGrammar}${Connector.whereGrammar !== '' ? ` ${Connector.whereGrammar}` : ''}`;

      Connector
        .delete()
        .then(() => {
          resolve();
        })
        .catch(/* istanbul ignore next */ (err) => {
          reject(err);
        });

      Connector.resetBinding();
      return this;
    });
  }

  static queryJoinBuilder() {
    if (Connector.bindings.join.length > 0) {
      Connector.joinGrammar = Connector.bindings.join.join(' ');
    }
  }

  static queryWhereBuilder() {
    if (Connector.bindings.where.length > 0) {
      Connector.whereGrammar = `WHERE ${Connector.bindings.where.join(' AND ')}`;
    }

    if (Connector.bindings.orWhere.length > 0) {
      Connector.whereGrammar = `${Connector.whereGrammar} OR ${Connector.bindings.orWhere.join(' OR ')}`;
    }
  }

  static queryGroupByBuilder() {
    if (Connector.bindings.group.length > 0) {
      Connector.groupByGrammar = `GROUP BY ${Connector.bindings.group.join(', ')}`;
    }
  }

  static queryOrderByBuilder() {
    if (Connector.bindings.order.length > 0) {
      Connector.orderByGrammar = `ORDER BY ${Connector.bindings.order.join(', ')}`;
    }
  }

  static queryHavingBuilder() {
    if (Connector.bindings.having.length > 0) {
      Connector.havingGrammar = `HAVING ${Connector.bindings.having.join(' AND ')}`;
    }
  }

  static queryBuilder() {
    const select = `SELECT${Connector.selectDistinct === true ? ' DISTINCT' : ''} ${Connector.bindings.select.length === 0 ? '*' : Connector.bindings.select.join(', ')}`;
    const from = `FROM ${Connector.bindings.from.join(' ')}`;

    Builder.queryJoinBuilder();
    Builder.queryWhereBuilder();
    Builder.queryOrderByBuilder();
    Builder.queryGroupByBuilder();
    Builder.queryHavingBuilder();

    let mix = '';
    if (Connector.bindings.mix.length > 0) {
      mix = Connector.bindings.mix.join(' ');
    }

    const query = `${select} ${from} ${Connector.joinGrammar} ${Connector.whereGrammar} ${Connector.orderByGrammar} ${Connector.groupByGrammar} ${Connector.havingGrammar} ${mix}`;
    return query;
  }

  /**
   * Is used to end whereExists
   *
   * @returns this
   * @memberof Builder
   */
  endWhereExists() {
    const query = Builder.queryBuilder();
    Connector.queries.push(query);
    Connector.queries.push(');');

    Connector.resetBinding();
    return this;
  }

  /**
   * Is used to end whereNotExists
   *
   * @returns this
   * @memberof Builder
   */
  endWhereNotExists() {
    const query = Builder.queryBuilder();
    Connector.queries.push(query);
    Connector.queries.push(');');

    Connector.resetBinding();
    return this;
  }

  /**
   * Is used to end havingExists
   *
   * @returns this
   * @memberof Builder
   */
  endHavingExists() {
    const query = Builder.queryBuilder();
    Connector.queries.push(query);
    Connector.queries.push(');');

    Connector.resetBinding();
    return this;
  }

  /**
   * Is used to end havingNotExists
   *
   * @returns this
   * @memberof Builder
   */
  endHavingNotExists() {
    const query = Builder.queryBuilder();
    Connector.queries.push(query);
    Connector.queries.push(');');

    Connector.resetBinding();
    return this;
  }

  /**
   * Make relationships with primary  data has one relation data
   *
   * @param {object} args
   * @returns this
   * @memberof Builder
   */
  hasOne(...args) {
    Relationships.hasRelationships = true;

    if (typeof args[0] === 'object') {
      args.forEach((tmp) => {
        Connector.relationshipBindingsQuery.push({ arguments: tmp, relationType: 'hasOne' });
      });
    } else {
      Connector.relationshipBindingsQuery.push({ arguments: args, relationType: 'hasOne' });
    }

    return this;
  }

  /**
   * Make relationships with primary  data has many relation data
   *
   * @param {object} args
   * @returns this
   * @memberof Builder
   */
  hasMany(...args) {
    Relationships.hasRelationships = true;

    if (typeof args[0] === 'object') {
      args.forEach((tmp) => {
        Connector.relationshipBindingsQuery.push({ arguments: tmp, relationType: 'hasMany' });
      });
    } else {
      Connector.relationshipBindingsQuery.push({ arguments: args, relationType: 'hasMany' });
    }

    return this;
  }

  /**
   * Make query from builder, and return to string
   *
   * @returns promise | string
   * @memberof Builder
   */
  makeQuery() {
    return new Promise((resolve) => {
      const query = Builder.queryBuilder();
      Connector.resetBinding();
      resolve(query);
    });
  }

  rawQuery(query) {
    return new Promise((resolve, reject) => {
      Connector
        .mysqlQueryProcess(query, (results, err) => {
          /* istanbul ignore if  */
          if (err) reject(err);
          else resolve(results);
        });
    });
  }

  /**
   * Get results array from mysql database
   *
   * @returns promise
   * @memberof Builder
   */
  get() {
    return new Promise((resolve, reject) => {
      const query = Builder.queryBuilder();
      const relationshipsQuery = [];
      Connector.relationshipBindingsQuery.forEach((func) => {
        relationshipsQuery.push({
          function: typeof func.arguments[func.arguments.length - 1] === 'function' ? func.arguments[func.arguments.length - 1] : null,
          table: func.arguments[0],
          objectKey: func.arguments[1],
          foreignKey: func.arguments[2],
          localKey: func.arguments[3],
          relationType: func.relationType,
        });
        Connector.relationshipBindingsQuery = [];
      });

      Connector
        .get(query)
        .then((results) => {
          if (!Relationships.hasRelationships) {
            resolve(results);
          } else {
            Relationships
              .run(relationshipsQuery, results)
              .then((results) => {
                Relationships.hasRelationships = false;
                resolve(results);
              })
              .catch(/* istanbul ignore next */ (err) => {
                reject(err);
              });
          }
        })
        .catch(/* istanbul ignore next */ (err) => {
          reject(err);
        });

      Connector.resetBinding();
      return this;
    });
  }

  /**
   * Get results object from mysql database
   *
   * @returns promise
   * @memberof Builder
   */
  first() {
    return new Promise((resolve, reject) => {
      const query = Builder.queryBuilder();
      const relationshipsQuery = [];
      Connector.relationshipBindingsQuery.forEach((func) => {
        relationshipsQuery.push({
          function: typeof func.arguments[func.arguments.length - 1] === 'function' ? func.arguments[func.arguments.length - 1] : null,
          table: func.arguments[0],
          objectKey: func.arguments[1],
          foreignKey: func.arguments[2],
          localKey: func.arguments[3],
          relationType: func.relationType,
        });
        Connector.relationshipBindingsQuery = [];
      });

      Connector
        .first(query)
        .then((results) => {
          if (!Relationships.hasRelationships) {
            resolve(results);
          } else {
            Relationships
              .run(relationshipsQuery, results)
              .then((results) => {
                Relationships.hasRelationships = false;
                resolve(results);
              })
              .catch(/* istanbul ignore next */ (err) => {
                reject(err);
              });
          }
        })
        .catch(/* istanbul ignore next */ (err) => {
          reject(err);
        });

      Connector.resetBinding();
      return this;
    });
  }

  /**
   * Get results object according to spesific column from mysql database
   *
   * @returns promise
   * @memberof Builder
   */
  pluck(...args) {
    return new Promise((resolve, reject) => {
      const query = Builder.queryBuilder();
      Connector
        .pluck(query, args)
        .then((results) => {
          resolve(results);
        })
        .catch(/* istanbul ignore next */ (err) => {
          reject(err);
        });

      Connector.resetBinding();
      return this;
    });
  }

  /**
   * Create query use to empty table from mysql database
   *
   * @param {*} tableName
   * @returns promise
   * @memberof Builder
   */
  truncate(tableName) {
    return new Promise((resolve, reject) => {
      const query = `TRUNCATE TABLE ${tableName}`;
      Connector
        .mysqlQueryProcess(query, (results, err) => {
          /* istanbul ignore if  */
          if (err) reject(err);
          else resolve();
        });

      return this;
    });
  }

  /**
   * Create query use to show column information from mysql database
   *
   * @param {string} tableName
   * @returns promise
   * @memberof Builder
   */
  columnInfo(tableName) {
    return new Promise((resolve, reject) => {
      const query = `SHOW COLUMNS FROM ${tableName}`;
      Connector
        .mysqlQueryProcess(query, (results, err) => {
          /* istanbul ignore if  */
          if (err) reject(err);
          else resolve(results);
        });

      return this;
    });
  }

  /**
   * Run schema builder
   *
   * @returns object
   * @memberof Builder
   */
  schema() {
    const schema = require('./Schema');
    return schema;
  }

  /**
   * Run database builder
   *
   * @returns object
   * @memberof Builder
   */
  db() {
    const db = require('./Db');
    return db;
  }

  /**
   * Run trigger builder
   *
   * @returns
   * @memberof Builder
   */
  trigger() {
    const trigger = require('./Trigger');
    return trigger;
  }
}

module.exports = new Builder();
