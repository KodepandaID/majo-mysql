const connector = require('./Connection/connector');
const compiler = require('./Grammar/Compiler');
const joinClause = require('./Grammar/JoinClause');

class Builder {
  select(...args) {
    connector.bindings.select.push(args.length === 0 ? '*' : args.join(', '));

    return this;
  }

  avg(column, asColumn = null) {
    connector.bindings.select.push(`AVG(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

    return this;
  }

  count(column = '*', asColumn = null) {
    connector.bindings.select.push(`COUNT(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

    return this;
  }

  sum(column, asColumn = null) {
    connector.bindings.select.push(`SUM(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

    return this;
  }

  min(column, asColumn = null) {
    connector.bindings.select.push(`MIN(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

    return this;
  }

  max(column, asColumn = null) {
    connector.bindings.select.push(`MAX(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

    return this;
  }

  distinct() {
    connector.selectDistinct = true;

    return this;
  }

  from(args) {
    connector.bindings.from.push(args);

    return this;
  }

  table(tableName) {
    connector.tables = tableName;

    return this;
  }

  join(table, joinColumn, operator = null, selectColumn = null, type = 'inner') {
    const query = joinClause.buildJoin(table, joinColumn, operator, selectColumn, type);
    connector.bindings.join.push(query);

    return this;
  }

  leftJoin(table, joinColumn, operator = '=', selectColumn = null, type = 'left') {
    this.join(table, joinColumn, operator, selectColumn, type);

    return this;
  }

  rightJoin(table, joinColumn, operator = '=', selectColumn = null, type = 'right') {
    this.join(table, joinColumn, operator, selectColumn, type);

    return this;
  }

  crossJoin(table, joinColumn, operator = '=', selectColumn = null, type = 'cross') {
    this.join(table, joinColumn, operator, selectColumn, type);

    return this;
  }

  where(...args) {
    if (typeof args[0] === 'object') {
      Builder.whereArrayProcess(args[0]);
    }

    if (args.length === 2) {
      Builder.whereValue(args[0], args[1]);
    }

    if (args.length === 3) {
      Builder.whereValueAndOperator(args[0], args[1], args[2]);
    }

    return this;
  }

  orWhere(...args) {
    if (typeof args[0] === 'object') {
      Builder.whereArrayProcess(args[0], 'orWhere');
    }

    if (args.length === 2) {
      Builder.whereValue(args[0], args[1], 'orWhere');
    }

    if (args.length === 3 && Builder.invalidWhereOperator(args[2])) {
      Builder.whereValueAndOperator(args[0], args[1], '=', 'orWhere');
    }

    if (args.length === 3 && !Builder.invalidWhereOperator(args[2])) {
      Builder.whereValueAndOperator(args[0], args[1], args[2], 'orWhere');
    }

    return this;
  }

  whereIn(...args) {
    if (Array.isArray(args[1])) {
      Builder.whereInArrayValue(args[0], args[1]);
    }

    if (typeof args[1] === 'string') {
      connector.bindings.where.push(`${args[0]} IN ('${args[1]})'`);
    }

    if (typeof args[1] === 'number') {
      connector.bindings.where.push(`${args[0]} IN (${args[1]})`);
    }

    if (args[1] === null) {
      connector.bindings.where.push(`${args[0]} IN (NULL)`);
    }

    return this;
  }

  whereNotIn(...args) {
    if (Array.isArray(args[1])) {
      Builder.whereNotInArrayValue(args[0], args[1]);
    }

    if (typeof args[1] === 'string') {
      connector.bindings.where.push(`${args[0]} NOT IN ('${args[1]})'`);
    }

    if (typeof args[1] === 'number') {
      connector.bindings.where.push(`${args[0]} NOT IN (${args[1]})`);
    }

    if (args[1] === null) {
      connector.bindings.where.push(`${args[0]} NOT IN (NULL)`);
    }

    return this;
  }

  whereNull(column) {
    this.where(column, null);

    return this;
  }

  whereNotNull(column) {
    connector.bindings.where.push(`${column} IS NOT NULL`);

    return this;
  }

  whereEmptyString(column) {
    connector.bindings.where.push(`${column} = ''`);

    return this;
  }

  whereBetween(column, start, end, whereClause = 'where') {
    connector.bindings[whereClause].push(`${column} BETWEEN ${start} AND ${end}`);

    return this;
  }

  whereNotBetween(column, start, end, whereClause = 'where') {
    connector.bindings[whereClause].push(`${column} NOT BETWEEN ${start} AND ${end}`);

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

  static whereArrayProcess(column, whereClauses = 'where') {
    const arr = Object.keys(column);

    arr.forEach((data) => {
      const value = typeof column[data] === 'number' || column[data] === null ? column[data] : `'${column[data]}'`;
      connector.bindings[whereClauses].push(`${data} = ${value}`);
    });
  }

  static whereInArrayValue(column, values) {
    const arr = [];
    values.forEach((data) => {
      if (typeof data === 'string') {
        arr.push(`'${data}'`);
      } else {
        arr.push(data);
      }
    });

    connector.bindings.where.push(`${column} IN (${arr.join(', ')})`);
  }

  static whereNotInArrayValue(column, values) {
    const arr = [];
    values.forEach((data) => {
      if (typeof data === 'string') {
        arr.push(`'${data}'`);
      } else {
        arr.push(data);
      }
    });

    connector.bindings.where.push(`${column} NOT IN (${arr.join(', ')})`);
  }

  static whereValue(column, value, whereClauses = 'where') {
    const valueFinal = typeof value === 'number' || value === null ? value : `'${value}'`;
    if (valueFinal === null) {
      connector.bindings[whereClauses].push(`${column} IS NULL`);
    }

    if (valueFinal !== null) {
      connector.bindings[whereClauses].push(`${column} = ${valueFinal}`);
    }
  }

  static whereValueAndOperator(column, operator, value, whereClauses = 'where') {
    const valueFinal = typeof value === 'number' || value === null ? value : `'${value}'`;
    connector.bindings[whereClauses].push(`${column} ${operator} ${valueFinal}`);
  }

  static invalidWhereOperator(operator) {
    let invalid = false;
    if (connector.operators.indexOf(operator) < 0) {
      invalid = true;
    }

    return invalid;
  }

  orderBy(column, direction = 'asc') {
    connector.bindings.order.push(`${column} ${direction.toUpperCase()}`);

    return this;
  }

  orderByDesc(column) {
    connector.bindings.order.push(`${column} DESC`);

    return this;
  }

  latest(column = 'created_date') {
    connector.bindings.order.push(`${column} DESC`);

    return this;
  }

  oldest(column = 'created_date') {
    connector.bindings.order.push(`${column} ASC`);

    return this;
  }

  orderByRaw(query) {
    query.replace(/order by/g, '');
    query.replace(/ORDER BY/g, '');
    connector.bindings.order.push(query);

    return this;
  }

  groupBy(...args) {
    args.forEach((data) => {
      connector.bindings.group.push(data);
    });

    return this;
  }

  groupByRaw(raw) {
    connector.bindings.group.push(raw);

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

  static havingValue(column, value) {
    this.havingValueAndOperator(column, '=', value);
  }

  static havingValueAndOperator(column, operator, value) {
    if (typeof value === 'number' || value === null) {
      connector.bindings.having.push(`${column} ${operator} ${value}`);
    }

    if (typeof value === 'string') {
      connector.bindings.having.push(`${column} ${operator} '${value}'`);
    }
  }

  skip(value) {
    this.offset(value);

    return this;
  }

  offset(value = 0) {
    connector.bindings.mix.push(`OFFSET ${value}`);

    return this;
  }

  take(value) {
    connector.bindings.mix.push(value);

    return this;
  }

  limit(value = 0) {
    if (value > 0) {
      connector.bindings.mix.push(`LIMIT ${value}`);
    }

    return this;
  }

  insert(...args) {
    return new Promise((resolve) => {
      if (args.length === 1 && !args[0].length) {
        connector.insertGrammar = compiler.compileInsert(connector.tables, args[0]);
      } else {
        connector.insertGrammar = compiler.compileInsertArray(connector.tables, args[0]);
      }
      resolve(connector.insertGrammar);
      this.resetBinding();
    });
  }

  update(...args) {
    return new Promise((resolve) => {
      let where = '';
      if (connector.bindings.where.length > 0) {
        where = `WHERE ${connector.bindings.where.join(' AND ')}`;
      }

      if (connector.bindings.orWhere.length > 0) {
        where = `${where} OR ${connector.bindings.orWhere.join(' AND ')}`;
      }

      if (typeof args[0] === 'string') {
        connector.this.updateGrammar = compiler.compileUpdate(connector.tables, args[0], args[1]);
        resolve(`${connector.updateGrammar}${where !== '' ? ` ${where}` : ''}`);
      }

      if (typeof args[0] === 'object') {
        connector.updateGrammar = compiler.compileUpdateArray(connector.tables, args);
        resolve(`${connector.updateGrammar}${where !== '' ? ` ${where}` : ''}`);
      }

      this.resetBinding();
    });
  }

  static queryBuilder() {
    const select = `SELECT${connector.selectDistinct === true ? ' DISTINCT' : ''} ${connector.bindings.select.join(' ')}`;
    const from = `FROM ${connector.bindings.from.join(' ')}`;

    let join = '';
    if (connector.bindings.join.length > 0) {
      join = connector.bindings.join.join(' ');
    }

    let where = '';
    if (connector.bindings.where.length > 0) {
      where = `WHERE ${connector.bindings.where.join(' AND ')}`;
    }

    if (connector.bindings.orWhere.length > 0) {
      where = `${where} OR ${connector.bindings.orWhere.join(' AND ')}`;
    }
    let order = '';
    if (connector.bindings.order.length > 0) {
      order = `ORDER BY ${connector.bindings.order.join(', ')}`;
    }

    let group = '';
    if (connector.bindings.group.length > 0) {
      group = `GROUP BY ${connector.bindings.group.join(', ')}`;
    }

    let having = '';
    if (connector.bindings.having.length > 0) {
      having = `HAVING ${connector.bindings.having.join(' AND ')}`;
    }

    let mix = '';
    if (connector.bindings.mix.length > 0) {
      mix = connector.bindings.mix.join(' ');
    }

    const query = `${select} ${from} ${join} ${where} ${order} ${group} ${having} ${mix}`;
    return query;
  }

  static resetBinding() {
    connector.bindings.select = [];
    connector.bindings.from = [];
    connector.bindings.join = [];
    connector.bindings.where = [];
    connector.bindings.having = [];
    connector.bindings.order = [];
    connector.bindings.union = [];
    connector.distinct = false;
    connector.insertGrammar = null;
    connector.updateGrammar = null;
  }

  runBuild() {
    return new Promise((resolve) => {
      if (connector.insertGrammar === null) {
        const query = this.queryBuilder();
        resolve(query);
      }

      if (connector.insertGrammar !== null) {
        resolve(connector.insertGrammar);
      }

      this.resetBinding();
    });
  }
}

module.exports = new Builder();
