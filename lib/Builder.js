const connector = require('./Connection/Connector');
const compiler = require('./Grammar/Compiler');
const joinClause = require('./Grammar/JoinClause');

class Builder {
  /**
   * Configuration of database
   *
   * @param {object} config
   * @returns this
   * @memberof Builder
   */
  connection(config) {
    connector.connection = config;

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
    connector.bindings.select.push(args.length === 0 ? '*' : args.join(', '));

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
    connector.bindings.select.push(`AVG(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

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
    connector.bindings.select.push(`COUNT(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

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
    connector.bindings.select.push(`SUM(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

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
    connector.bindings.select.push(`MIN(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

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
    connector.bindings.select.push(`MAX(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

    return this;
  }

  /**
   * Create query select distinct
   *
   * @returns this
   * @memberof Builder
   */
  distinct() {
    connector.selectDistinct = true;

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
    connector.tables = args;
    connector.bindings.from.push(args);

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
    connector.tables = tableName;
    connector.bindings.from.push(tableName);

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
    const query = joinClause.buildJoin(table, joinColumn, operator, selectColumn, type);
    connector.bindings.join.push(query);

    return this;
  }

  /**
   * Create query left join
   *
   * @param {string} table
   * @param {string} joinColumn
   * @param {string} [operator='=']
   * @param {string} [selectColumn=null]
   * @param {string} [type='left']
   * @returns this
   * @memberof Builder
   */
  leftJoin(table, joinColumn, operator = '=', selectColumn = null, type = 'left') {
    this.join(table, joinColumn, operator, selectColumn, type);

    return this;
  }

  /**
   * Create query left outer join
   *
   * @param {string} table
   * @param {string} joinColumn
   * @param {string} [operator='=']
   * @param {string} [selectColumn=null]
   * @param {string} [type='left outer']
   * @returns this
   * @memberof Builder
   */
  leftOuterJoin(table, joinColumn, operator = '=', selectColumn = null, type = 'left outer') {
    this.join(table, joinColumn, operator, selectColumn, type);

    return this;
  }

  /**
   * Create query right join
   *
   * @param {string} table
   * @param {string} joinColumn
   * @param {string} [operator='=']
   * @param {string} [selectColumn=null]
   * @param {string} [type='right']
   * @returns this
   * @memberof Builder
   */
  rightJoin(table, joinColumn, operator = '=', selectColumn = null, type = 'right') {
    this.join(table, joinColumn, operator, selectColumn, type);

    return this;
  }

  /**
   * Create query right outer join
   *
   * @param {string} table
   * @param {string} joinColumn
   * @param {string} [operator='=']
   * @param {string} [selectColumn=null]
   * @param {string} [type='right outer']
   * @returns this
   * @memberof Builder
   */
  rightOuterJoin(table, joinColumn, operator = '=', selectColumn = null, type = 'right outer') {
    this.join(table, joinColumn, operator, selectColumn, type);

    return this;
  }

  /**
   * Create query inner join
   *
   * @param {string} table
   * @param {string} joinColumn
   * @param {string} [operator='=']
   * @param {string} [selectColumn=null]
   * @param {string} [type='inner']
   * @returns this
   * @memberof Builder
   */
  innerJoin(table, joinColumn, operator = '=', selectColumn = null, type = 'inner') {
    this.join(table, joinColumn, operator, selectColumn, type);

    return this;
  }

  /**
   * Create query full outer join
   *
   * @param {string} table
   * @param {string} joinColumn
   * @param {string} [operator='=']
   * @param {string} [selectColumn=null]
   * @param {string} [type='full outer']
   * @returns this
   * @memberof Builder
   */
  fullOuterJoin(table, joinColumn, operator = '=', selectColumn = null, type = 'full outer') {
    this.join(table, joinColumn, operator, selectColumn, type);

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
    connector.bindings.join.push(raw);

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

    // If argument use field, value and operator
    if (args.length === 3) {
      Builder.whereValueAndOperator(args[0], args[1], args[2]);
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
  orWhere(...args) {
    // If argument is object
    if (typeof args[0] === 'object') {
      Builder.whereArrayProcess(args[0], 'orWhere');
    }

    // If argument use field and value without operator
    if (args.length === 2) {
      Builder.whereValue(args[0], args[1], 'orWhere');
    }

    // If argument use field, value and operator
    if (args.length === 3 && Builder.invalidWhereOperator(args[2])) {
      Builder.whereValueAndOperator(args[0], args[1], '=', 'orWhere');
    }

    if (args.length === 3 && !Builder.invalidWhereOperator(args[2])) {
      Builder.whereValueAndOperator(args[0], args[1], args[2], 'orWhere');
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
    connector.bindings.where.push(raw);

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
      connector.bindings.where.push(`${args[0]} NOT IN ('${args[1]})'`);
    }

    // If second argument is number
    if (typeof args[1] === 'number') {
      connector.bindings.where.push(`${args[0]} NOT IN (${args[1]})`);
    }

    // if second argument is null
    if (args[1] === null) {
      connector.bindings.where.push(`${args[0]} NOT IN (NULL)`);
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
    connector.bindings.where.push(`${column} IS NOT NULL`);

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
    connector.bindings.where.push(`${column} = ''`);

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
    connector.bindings[whereClause].push(`${column} BETWEEN ${start} AND ${end}`);

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
    connector.bindings[whereClause].push(`${column} NOT BETWEEN ${start} AND ${end}`);

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
   * Create query where, if use where much column
   *
   * @static
   * @param {array} column
   * @param {string} [whereClauses='where']
   * @memberof Builder
   */
  static whereArrayProcess(column, whereClauses = 'where') {
    const arr = Object.keys(column);

    arr.forEach((data) => {
      const value = typeof column[data] !== 'string' ? column[data] : `'${column[data]}'`;
      connector.bindings[whereClauses].push(`${data} = ${value}`);
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

    connector.bindings.where.push(`${column} IN (${arr.join(', ')})`);
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

    connector.bindings.where.push(`${column} NOT IN (${arr.join(', ')})`);
  }

  /**
   * Create query where, if use single field and value
   *
   * @static
   * @param {string} column
   * @param {string / number} value
   * @param {string} [whereClauses='where']
   * @memberof Builder
   */
  static whereValue(column, value, whereClauses = 'where') {
    const valueFinal = typeof value !== 'string' ? value : `'${value}'`;
    if (valueFinal === null) {
      connector.bindings[whereClauses].push(`${column} IS NULL`);
    }

    if (valueFinal !== null) {
      connector.bindings[whereClauses].push(`${column} = ${valueFinal}`);
    }
  }

  /**
   * Create query where with operator
   *
   * @static
   * @param {string} column
   * @param {string} operator
   * @param {string / number} value
   * @param {string} [whereClauses='where']
   * @memberof Builder
   */
  static whereValueAndOperator(column, operator, value, whereClauses = 'where') {
    const valueFinal = typeof value !== 'string' ? value : `'${value}'`;
    connector.bindings[whereClauses].push(`${column} ${operator} ${valueFinal}`);
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
    if (connector.operators.indexOf(operator) < 0) {
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
    connector.bindings.order.push(`${column} ${direction.toUpperCase()}`);

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
    connector.bindings.order.push(`${column} DESC`);

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
    connector.bindings.order.push(`${column} DESC`);

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
    connector.bindings.order.push(`${column} ASC`);

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
    connector.bindings.order.push(query);

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
      connector.bindings.group.push(data);
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
    connector.bindings.group.push(raw);

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
      connector.bindings.having.push(`${column} ${operator} ${value}`);
    }

    // If value is string
    if (typeof value === 'string') {
      connector.bindings.having.push(`${column} ${operator} '${value}'`);
    }

    // If value is object
    if (typeof value === 'object') {
      connector.bindings.having.push(`${column} ${operator} ${value === null ? 'NULL' : value.join(', ')}`);
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
    connector.bindings.mix.push(`OFFSET ${value}`);

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
      connector.bindings.mix.push(`LIMIT ${value}`);
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
        connector.updateGrammar = compiler.compileIncrementArray(connector.tables, args[0]);
      }

      // If argument not object and not set value increment
      if (typeof args[0] !== 'object' && args.length === 1) {
        connector.updateGrammar = compiler.compileIncrement(connector.tables, args[0], 1);
      }

      // If argument not object and use value increment
      if (typeof args[0] !== 'object' && args.length === 2) {
        connector.updateGrammar = compiler.compileIncrement(connector.tables, args[0], args[1]);
      }

      connector.updateGrammar = `${connector.updateGrammar}${connector.whereGrammar !== '' ? ` ${connector.whereGrammar}` : ''}`;

      connector
        .update()
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });

      Builder.resetBinding();
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
        connector.updateGrammar = compiler.compileDecrementArray(connector.tables, args[0]);
      }

      // If argument not object and not set value increment
      if (typeof args[0] !== 'object' && args.length === 1) {
        connector.updateGrammar = compiler.compileDecrement(connector.tables, args[0], 1);
      }

      // If argument not object and use value increment
      if (typeof args[0] !== 'object' && args.length === 2) {
        connector.updateGrammar = compiler.compileDecrement(connector.tables, args[0], args[1]);
      }

      connector.updateGrammar = `${connector.updateGrammar}${connector.whereGrammar !== '' ? ` ${connector.whereGrammar}` : ''}`;

      connector
        .update()
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });

      Builder.resetBinding();
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
        connector.insertGrammar = compiler.compileInsert(connector.tables, args[0]);
      } else {
        connector.insertGrammar = compiler.compileInsertArray(connector.tables, args[0]);
      }

      connector
        .insert()
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });

      Builder.resetBinding();
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
        connector.insertGrammar = compiler.compileInsert(connector.tables, args[0]);
      } else {
        connector.insertGrammar = compiler.compileInsertArray(connector.tables, args[0]);
      }

      connector
        .insertGetId()
        .then((insertId) => {
          resolve(insertId);
        })
        .catch((err) => {
          reject(err);
        });

      Builder.resetBinding();
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
        connector.updateGrammar = compiler.compileUpdate(connector.tables, args[0], args[1]);
      }

      if (typeof args[0] === 'object') {
        connector.updateGrammar = compiler.compileUpdateArray(connector.tables, args);
      }

      connector.updateGrammar = `${connector.updateGrammar}${connector.whereGrammar !== '' ? ` ${connector.whereGrammar}` : ''}`;

      connector
        .update()
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });

      Builder.resetBinding();
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

      connector.deleteGrammar = compiler.compileDelete(connector.tables);
      connector.deleteGrammar = `${connector.deleteGrammar}${connector.whereGrammar !== '' ? ` ${connector.whereGrammar}` : ''}`;

      connector
        .delete()
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });

      Builder.resetBinding();
      return this;
    });
  }

  static queryJoinBuilder() {
    if (connector.bindings.join.length > 0) {
      connector.joinGrammar = connector.bindings.join.join(' ');
    }
  }

  static queryWhereBuilder() {
    if (connector.bindings.where.length > 0) {
      connector.whereGrammar = `WHERE ${connector.bindings.where.join(' AND ')}`;
    }

    if (connector.bindings.orWhere.length > 0) {
      connector.whereGrammar = `${connector.whereGrammar} OR ${connector.bindings.orWhere.join(' AND ')}`;
    }
  }

  static queryGroupByBuilder() {
    if (connector.bindings.group.length > 0) {
      connector.groupByGrammar = `GROUP BY ${connector.bindings.group.join(', ')}`;
    }
  }

  static queryOrderByBuilder() {
    if (connector.bindings.order.length > 0) {
      connector.orderByGrammar = `ORDER BY ${connector.bindings.order.join(', ')}`;
    }
  }

  static queryHavingBuilder() {
    if (connector.bindings.having.length > 0) {
      connector.havingGrammar = `HAVING ${connector.bindings.having.join(' AND ')}`;
    }
  }

  static queryBuilder() {
    const select = `SELECT${connector.selectDistinct === true ? ' DISTINCT' : ''} ${connector.bindings.select.length === 0 ? '*' : connector.bindings.select.join(', ')}`;
    const from = `FROM ${connector.bindings.from.join(' ')}`;

    Builder.queryJoinBuilder();
    Builder.queryWhereBuilder();
    Builder.queryOrderByBuilder();
    Builder.queryGroupByBuilder();
    Builder.queryHavingBuilder();

    let mix = '';
    if (connector.bindings.mix.length > 0) {
      mix = connector.bindings.mix.join(' ');
    }

    const query = `${select} ${from} ${connector.joinGrammar} ${connector.whereGrammar} ${connector.orderByGrammar} ${connector.groupByGrammar} ${connector.havingGrammar} ${mix}`;
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
    connector.insertGrammar = '';
    connector.updateGrammar = '';
    connector.whereGrammar = '';
    connector.joinGrammar = '';
    connector.orderByGrammar = '';
    connector.groupByGrammar = '';
    connector.havingGrammar = '';
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
      connector
        .get(query)
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          reject(err);
        });

      Builder.resetBinding();
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
      connector
        .first(query)
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          reject(err);
        });

      Builder.resetBinding();
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
      connector
        .pluck(query, args)
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          reject(err);
        });

      Builder.resetBinding();
      return this;
    });
  }
}

module.exports = new Builder();
