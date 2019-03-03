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
      union: [],
    };
    this.distinct = false;
    this.operators = [
      '=', '<', '>', '<=', '>=', '<>', '!=', '<=>',
      'like', 'like binary', 'not like', 'ilike',
      '&', '|', '^', '<<', '>>',
      'rlike', 'regexp', 'not regexp',
      '~', '~*', '!~', '!~*', 'similar to',
      'not similar to', 'not ilike', '~~*', '!~~*',
    ];
  }

  select(...args) {
    this.bindings.select.push(args.length === 0 ? '*' : args.join(', '));

    return this;
  }

  distinct() {
    this.distinct = true;

    return this;
  }

  from(args) {
    this.bindings.from.push(args);

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
    this.bindings[whereClauses].push(`${column} = ${valueFinal}`);
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

  runBuild() {
    return new Promise((resolve) => {
      const select = `SELECT ${this.bindings.select.join(' ')}`;
      const from = `FROM ${this.bindings.from.join(' ')}`;
      const join = this.bindings.join.join(' ');
      let where = `WHERE ${this.bindings.where.join(' AND ')}`;
      if (this.bindings.orWhere.length > 0) {
        where = `${where} OR ${this.bindings.orWhere.join(' AND ')}`;
      }
      const order = `ORDER BY ${this.bindings.order.join(', ')}`;

      const query = `${select} ${from} ${join} ${where} ${order}`;

      this.bindings.select = [];
      this.bindings.from = [];
      this.bindings.join = [];
      this.bindings.where = [];
      this.bindings.having = [];
      this.bindings.order = [];
      this.bindings.union = [];
      this.distinct = false;
      resolve(query);
    });
  }
}

module.exports = new Builder();
