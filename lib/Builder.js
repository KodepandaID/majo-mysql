const compileInsert = require('./CompileInsert');
const joinClause = require('./JoinClause');

class Builder {
  constructor() {
    // Query value binding
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
    this.insertGrammar = null;
    this.operators = [
      '=', '<', '>', '<=', '>=', '<>', '!=', '<=>',
      'like', 'like binary', 'not like', 'ilike',
      '&', '|', '^', '<<', '>>',
      'rlike', 'regexp', 'not regexp',
      '~', '~*', '!~', '!~*', 'similar to',
      'not similar to', 'not ilike', '~~*', '!~~*',
    ];
    this.tables = null;
  }

  select(...args) {
    this.bindings.select.push(args.length === 0 ? '*' : args.join(', '));

    return this;
  }

  avg(column, asColumn = null) {
    this.bindings.select.push(`AVG(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

    return this;
  }

  count(column = '*', asColumn = null) {
    this.bindings.select.push(`COUNT(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

    return this;
  }

  sum(column, asColumn = null) {
    this.bindings.select.push(`SUM(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

    return this;
  }

  min(column, asColumn = null) {
    this.bindings.select.push(`MIN(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

    return this;
  }

  max(column, asColumn = null) {
    this.bindings.select.push(`MAX(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

    return this;
  }

  distinct() {
    this.selectDistinct = true;

    return this;
  }

  from(args) {
    this.bindings.from.push(args);

    return this;
  }

  table(tableName) {
    this.tables = tableName;

    return this;
  }

  join(table, joinColumn, operator = null, selectColumn = null, type = 'inner') {
    const query = joinClause.buildJoin(table, joinColumn, operator, selectColumn, type);
    this.bindings.join.push(query);

    return this;
  }

  leftJoin(table, joinColumn, operator = '=', selectColumn = null, type = 'left') {
    this.join(table, joinColumn, operator, selectColumn, type);
  }

  rightJoin(table, joinColumn, operator = '=', selectColumn = null, type = 'right') {
    this.join(table, joinColumn, operator, selectColumn, type);
  }

  crossJoin(table, joinColumn, operator = '=', selectColumn = null, type = 'cross') {
    this.join(table, joinColumn, operator, selectColumn, type);
  }

  where(...args) {
    if (typeof args[0] === 'object') {
      this.whereArrayProcess(args[0]);
    }

    if (args.length === 2) {
      this.whereValue(args[0], args[1]);
    }

    if (args.length === 3) {
      this.whereValueAndOperator(args[0], args[1], args[2]);
    }

    return this;
  }

  orWhere(...args) {
    if (typeof args[0] === 'object') {
      this.whereArrayProcess(args[0], 'orWhere');
    }

    if (args.length === 2) {
      this.whereValue(args[0], args[1], 'orWhere');
    }

    if (args.length === 3 && this.invalidWhereOperator(args[2])) {
      this.whereValueAndOperator(args[0], args[1], '=', 'orWhere');
    }

    if (args.length === 3 && !this.invalidWhereOperator(args[2])) {
      this.whereValueAndOperator(args[0], args[1], args[2], 'orWhere');
    }

    return this;
  }

  whereIn(...args) {
    if (Array.isArray(args[1])) {
      this.whereInArrayValue(args[0], args[1]);
    }

    if (typeof args[1] === 'string') {
      this.bindings.where.push(`${args[0]} IN ('${args[1]})'`);
    }

    if (typeof args[1] === 'number') {
      this.bindings.where.push(`${args[0]} IN (${args[1]})`);
    }

    if (args[1] === null) {
      this.bindings.where.push(`${args[0]} IN (NULL)`);
    }

    return this;
  }

  whereNotIn(...args) {
    if (Array.isArray(args[1])) {
      this.whereNotInArrayValue(args[0], args[1]);
    }

    if (typeof args[1] === 'string') {
      this.bindings.where.push(`${args[0]} NOT IN ('${args[1]})'`);
    }

    if (typeof args[1] === 'number') {
      this.bindings.where.push(`${args[0]} NOT IN (${args[1]})`);
    }

    if (args[1] === null) {
      this.bindings.where.push(`${args[0]} NOT IN (NULL)`);
    }

    return this;
  }

  whereNull(column) {
    this.where(column, null);

    return this;
  }

  whereNotNull(column) {
    this.bindings.where.push(`${column} IS NOT NULL`);

    return this;
  }

  whereEmptyString(column) {
    this.bindings.where.push(`${column} = ''`);

    return this;
  }

  whereBetween(column, start, end, whereClause = 'where') {
    this.bindings[whereClause].push(`${column} BETWEEN ${start} AND ${end}`);

    return this;
  }

  whereNotBetween(column, start, end, whereClause = 'where') {
    this.bindings[whereClause].push(`${column} NOT BETWEEN ${start} AND ${end}`);

    return this;
  }

  orWhereBetween(column, start, end) {
    this.whereBetween(column, start, end, 'orWhere');

    return this;
  }

  orWhereNotBetween(column, start, end) {
    this.whereNotBetween(column, start, end, 'orWhere');

    return this;
  }

  whereArrayProcess(column, whereClauses = 'where') {
    const arr = Object.keys(column);

    arr.forEach((data) => {
      const value = typeof column[data] === 'number' || column[data] === null ? column[data] : `'${column[data]}'`;
      this.bindings[whereClauses].push(`${data} = ${value}`);
    });
  }

  whereInArrayValue(column, values) {
    const arr = [];
    values.forEach((data) => {
      if (typeof data === 'string') {
        arr.push(`'${data}'`);
      } else {
        arr.push(data);
      }
    });

    this.bindings.where.push(`${column} IN (${arr.join(', ')})`);
  }

  whereNotInArrayValue(column, values) {
    const arr = [];
    values.forEach((data) => {
      if (typeof data === 'string') {
        arr.push(`'${data}'`);
      } else {
        arr.push(data);
      }
    });

    this.bindings.where.push(`${column} NOT IN (${arr.join(', ')})`);
  }

  whereValue(column, value, whereClauses = 'where') {
    const valueFinal = typeof value === 'number' || value === null ? value : `'${value}'`;
    if (valueFinal === null) {
      this.bindings[whereClauses].push(`${column} IS NULL`);
    }

    if (valueFinal !== null) {
      this.bindings[whereClauses].push(`${column} = ${valueFinal}`);
    }
  }

  whereValueAndOperator(column, operator, value, whereClauses = 'where') {
    const valueFinal = typeof value === 'number' || value === null ? value : `'${value}'`;
    this.bindings[whereClauses].push(`${column} ${operator} ${valueFinal}`);
  }

  invalidWhereOperator(operator) {
    let invalid = false;
    if (this.operators.indexOf(operator) < 0) {
      invalid = true;
    }

    return invalid;
  }

  orderBy(column, direction = 'asc') {
    this.bindings.order.push(`${column} ${direction.toUpperCase()}`);

    return this;
  }

  orderByDesc(column) {
    this.bindings.order.push(`${column} DESC`);

    return this;
  }

  latest(column = 'created_date') {
    this.bindings.order.push(`${column} DESC`);

    return this;
  }

  oldest(column = 'created_date') {
    this.bindings.order.push(`${column} ASC`);

    return this;
  }

  orderByRaw(query) {
    query.replace(/order by/g, '');
    query.replace(/ORDER BY/g, '');
    this.bindings.order.push(query);

    return this;
  }

  groupBy(...args) {
    args.forEach((data) => {
      this.bindings.group.push(data);
    });

    return this;
  }

  having(...args) {
    if (args.length === 2) {
      this.havingValue(args[0], args[1]);
    }

    if (args.length === 3) {
      this.havingValueAndOperator(args[0], args[1], args[2]);
    }

    return this;
  }

  havingValue(column, value) {
    this.havingValueAndOperator(column, '=', value);
  }

  havingValueAndOperator(column, operator, value) {
    if (typeof value === 'number' || value === null) {
      this.bindings.having.push(`${column} ${operator} ${value}`);
    }

    if (typeof value === 'string') {
      this.bindings.having.push(`${column} ${operator} '${value}'`);
    }
  }

  skip(value) {
    this.offset(value);

    return this;
  }

  offset(value = 0) {
    this.bindings.mix.push(`OFFSET ${value}`);

    return this;
  }

  take(value) {
    this.bindings.mix.push(value);
  }

  limit(value = 0) {
    if (value > 0) {
      this.bindings.mix.push(`LIMIT ${value}`);
    }

    return this;
  }

  insert(...args) {
    if (args.length === 1 && !args[0].length) {
      this.insertGrammar = compileInsert.runBuild(this.tables, args[0]);
    } else {
      this.insertGrammar = compileInsert.runBuildArray(this.tables, args);
    }

    return this;
  }

  queryBuilder() {
    const select = `SELECT${this.selectDistinct === true ? ' DISTINCT' : ''} ${this.bindings.select.join(' ')}`;
    const from = `FROM ${this.bindings.from.join(' ')}`;

    let join = '';
    if (this.bindings.join.length > 0) {
      join = this.bindings.join.join(' ');
    }

    let where = '';
    if (this.bindings.where.length > 0) {
      where = `WHERE ${this.bindings.where.join(' AND ')}`;
    }

    if (this.bindings.orWhere.length > 0) {
      where = `${where} OR ${this.bindings.orWhere.join(' AND ')}`;
    }
    let order = '';
    if (this.bindings.order.length > 0) {
      order = `ORDER BY ${this.bindings.order.join(', ')}`;
    }

    let group = '';
    if (this.bindings.group.length > 0) {
      group = `GROUP BY ${this.bindings.group.join(', ')}`;
    }

    let having = '';
    if (this.bindings.having.length > 0) {
      having = `HAVING ${this.bindings.having.join(' AND ')}`;
    }

    let mix = '';
    if (this.bindings.mix.length > 0) {
      mix = this.bindings.mix.join(' ');
    }

    const query = `${select} ${from} ${join} ${where} ${order} ${group} ${having} ${mix}`;
    return query;
  }

  runBuild() {
    return new Promise((resolve) => {
      if (this.insertGrammar === null) {
        const query = this.queryBuilder();
        resolve(query);
      }

      if (this.insertGrammar !== null) {
        resolve(this.insertGrammar);
      }

      this.bindings.select = [];
      this.bindings.from = [];
      this.bindings.join = [];
      this.bindings.where = [];
      this.bindings.having = [];
      this.bindings.order = [];
      this.bindings.union = [];
      this.distinct = false;
    });
  }
}

module.exports = new Builder();
