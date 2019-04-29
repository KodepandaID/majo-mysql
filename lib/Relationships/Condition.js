const Connector = require('../Connection/Connector');
const JoinClause = require('../Grammar/JoinClause');
const Relationships = require('./Relationships');

class Condition {
  /**
   * Create select query
   *
   * @param {object} args
   * @returns this
   * @memberof Builder
   */
  select(...args) {
    Condition.pushBinding('select', args.length === 0 ? '*' : args.join(', '));

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
    Condition.pushBinding('select', `AVG(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

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
    Condition.pushBinding('select', `COUNT(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

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
    Condition.pushBinding('select', `COUNT(DISTINCT ${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

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
    Condition.pushBinding('select', `SUM(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

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
    Condition.pushBinding('select', `MIN(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

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
    Condition.pushBinding('select', `MAX(${column}) ${asColumn === null ? '' : `AS ${asColumn}`}`);

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
    const lastStoredQuery = Condition.lastStoredQuery();
    const query = JoinClause.buildJoin(table, joinColumn, operator, selectColumn, type);

    if (Connector.relationshipBindings.join[lastStoredQuery] === undefined) {
      Connector.relationshipBindings.join = {
        [`${lastStoredQuery}`]: [query],
      };
    } else {
      Connector.relationshipBindings.join[lastStoredQuery].push(query);
    }

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
    const lastStoredQuery = Condition.lastStoredQuery();

    if (Connector.relationshipBindings.join[lastStoredQuery] === undefined) {
      Connector.relationshipBindings.join = {
        [`${lastStoredQuery}`]: [raw],
      };
    } else {
      Connector.relationshipBindings.join[lastStoredQuery].push(raw);
    }

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
    if (typeof args[0] === 'object') Condition.whereArrayProcess(args[0]);

    // If argument use field and value without operator
    if (args.length === 2) Condition.whereValue(args[0], args[1]);

    // If argument use field, value and operator not available
    if (args.length === 3 && !Condition.invalidWhereOperator(args[1])) Condition.whereValueAndOperator(args[0], '=', args[2], 'where');

    // If argument use field, value and operator is available
    if (args.length === 3 && Condition.invalidWhereOperator(args[1])) Condition.whereValueAndOperator(args[0], args[1], args[2], 'where');

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
    // If argument is object
    if (typeof args[0] === 'object') Condition.whereArrayProcess(args[0], 'where', 'value', 'and');

    // If argument use field and value without operator
    if (args.length === 2) Condition.whereValue(args[0], args[1], 'where', 'value', 'and');

    // If argument use field, value and operator not available
    if (args.length === 3 && !Condition.invalidWhereOperator(args[1])) Condition.whereValueAndOperator(args[0], '=', args[2], 'where', 'value', 'and');

    // If argument use field, value and operator is available
    if (args.length === 3 && Condition.invalidWhereOperator(args[1])) Condition.whereValueAndOperator(args[0], args[1], args[2], 'where', 'value', 'and');

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
    if (typeof args[0] === 'object') Condition.whereArrayProcess(args[0], 'orWhere');

    // If argument use field and value without operator
    if (args.length === 2) Condition.whereValue(args[0], args[1], 'orWhere');

    // If argument use field, value and operator not available
    if (args.length === 3 && !Condition.invalidWhereOperator(args[1])) Condition.whereValueAndOperator(args[0], '=', args[2], 'orWhere');

    // If argument use field, value and operator is available
    if (args.length === 3 && Condition.invalidWhereOperator(args[1])) Condition.whereValueAndOperator(args[0], args[1], args[2], 'orWhere');

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
    if (typeof args[0] === 'object') Condition.whereArrayProcess(args[0], 'orWhere', 'value', 'and');

    // If argument use field and value without operator
    if (args.length === 2) Condition.whereValue(args[0], args[1], 'orWhere', 'value', 'and');

    // If argument use field, value and operator not available
    if (args.length === 3 && !Condition.invalidWhereOperator(args[1])) Condition.whereValueAndOperator(args[0], '=', args[2], 'orWhere', 'value', 'and');

    // If argument use field, value and operator is available
    if (args.length === 3 && Condition.invalidWhereOperator(args[1])) Condition.whereValueAndOperator(args[0], args[1], args[2], 'orWhere', 'value', 'and');

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
    Condition.pushBinding('where', raw);

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
    if (Array.isArray(args[1])) Condition.whereInArrayValue(args[0], args[1]);

    if (typeof args[1] === 'string') Condition.pushBinding('where', `${args[0]} IN ('${args[1]}')`);

    if (typeof args[1] === 'number') Condition.pushBinding('where', `${args[0]} IN (${args[1]})`);

    if (args[1] === null) Condition.pushBinding('where', `${args[0]} IN (NULL)`);

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
    if (Array.isArray(args[1])) Condition.whereNotInArrayValue(args[0], args[1]);

    // If second argument is string
    if (typeof args[1] === 'string') Condition.pushBinding('where', `${args[0]} NOT IN ('${args[1]}')`);

    // If second argument is number
    if (typeof args[1] === 'number') Condition.pushBinding('where', `${args[0]} NOT IN (${args[1]})`);

    // if second argument is null
    if (args[1] === null) Condition.pushBinding('where', `${args[0]} NOT IN (NULL)`);

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
    Condition.pushBinding('where', `${column} IS NOT NULL`);

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
    Condition.pushBinding('where', `${column} = ''`);

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
    Condition.pushBinding(whereClause, `${column} BETWEEN ${start} AND ${end}`);

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
    Condition.pushBinding(whereClause, `${column} NOT BETWEEN ${start} AND ${end}`);

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
    if (typeof args[0] === 'object') Condition.whereArrayProcess(args[0], 'where', 'column');

    // If argument use field and value without operator
    if (args.length === 2) Condition.whereValue(args[0], args[1], 'where', 'column');

    // If argument use field, value and operator
    if (args.length === 3) Condition.whereValueAndOperator(args[0], args[1], args[2], 'where', 'column');

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
    if (typeof args[0] === 'object') Condition.whereArrayProcess(args[0], 'orWhere', 'column');

    // If argument use field and value without operator
    if (args.length === 2) Condition.whereValue(args[0], args[1], 'orWhere', 'column');

    // If argument use field, value and operator
    if (args.length === 3) Condition.whereValueAndOperator(args[0], args[1], args[2], 'orWhere', 'column');

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
  static whereArrayProcess(column, whereClause = 'where', whereType = 'value', andWhere = null) {
    const lastStoredQuery = Condition.lastStoredQuery();
    const arr = Object.keys(column);

    arr.forEach((data) => {
      const value = typeof column[data] !== 'string' || whereType === 'column' ? column[data] : `'${column[data]}'`;

      if (andWhere === null) {
        Condition.pushBinding(whereClause, `${data} = ${value}`);
      } else {
        const lastWhere = Condition.lastWhere(lastStoredQuery);
        Condition.pushBinding(whereClause, `${lastWhere.query} AND ${data} = ${value}`);
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

    Condition.pushBinding('where', `${column} IN (${arr.join(', ')})`);
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

    Condition.pushBinding('where', `${column} NOT IN (${arr.join(', ')})`);
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
  static whereValue(column, value, whereClause = 'where', whereType = 'value', andWhere = null) {
    const lastStoredQuery = Condition.lastStoredQuery();

    const valueFinal = typeof value !== 'string' || whereType === 'column' ? value : `'${value}'`;
    if (valueFinal === null) {
      if (andWhere === null) {
        Condition.pushBinding(whereClause, `${column} IS NULL`);
      } else {
        const lastWhere = Condition.lastWhere(lastStoredQuery);
        Condition.pushBinding(whereClause, `${lastWhere.query} AND ${column} IS NULL`);
      }
    }

    if (valueFinal !== null) {
      if (andWhere === null) {
        Condition.pushBinding(whereClause, `${column} = ${valueFinal}`);
      } else {
        const lastWhere = Condition.lastWhere();
        Condition.pushBinding(whereClause, `${lastWhere.query} AND ${column} = ${valueFinal}`);
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
  static whereValueAndOperator(column, operator, value, whereClause = 'where', whereType = 'value', andWhere = null) {
    const lastStoredQuery = Condition.lastStoredQuery();

    const valueFinal = typeof value !== 'string' || whereType === 'column' ? value : `'${value}'`;
    if (andWhere === null) {
      Condition.pushBinding(whereClause, `${column} ${operator} ${valueFinal}`);
    } else {
      const lastWhere = Condition.lastWhere(lastStoredQuery);
      Condition.pushBinding(whereClause, `${lastWhere.query} AND ${column} ${operator} ${valueFinal}`);
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
    const lastStoredQuery = Condition.lastStoredQuery();

    if (Connector.relationshipBindings.order[lastStoredQuery] === undefined) {
      Connector.relationshipBindings.order = {
        [`${lastStoredQuery}`]: [`${column} ${direction.toUpperCase()}`],
      };
    } else {
      Connector.relationshipBindings.order[lastStoredQuery].push(`${column} ${direction.toUpperCase()}`);
    }

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
    const lastStoredQuery = Condition.lastStoredQuery();

    if (Connector.relationshipBindings.order[lastStoredQuery] === undefined) {
      Connector.relationshipBindings.order = {
        [`${lastStoredQuery}`]: [`${column} DESC`],
      };
    } else {
      Connector.relationshipBindings.order[lastStoredQuery].push(`${column} DESC`);
    }

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
    const lastStoredQuery = Condition.lastStoredQuery();

    if (Connector.relationshipBindings.order[lastStoredQuery] === undefined) {
      Connector.relationshipBindings.order = {
        [`${lastStoredQuery}`]: [`${column} DESC`],
      };
    } else {
      Connector.relationshipBindings.order[lastStoredQuery].push(`${column} DESC`);
    }

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
    const lastStoredQuery = Condition.lastStoredQuery();

    if (Connector.relationshipBindings.order[lastStoredQuery] === undefined) {
      Connector.relationshipBindings.order = {
        [`${lastStoredQuery}`]: [`${column} ASC`],
      };
    } else {
      Connector.relationshipBindings.order[lastStoredQuery].push(`${column} ASC`);
    }

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
    const lastStoredQuery = Condition.lastStoredQuery();

    if (Connector.relationshipBindings.order[lastStoredQuery] === undefined) {
      Connector.relationshipBindings.order = {
        [`${lastStoredQuery}`]: [`${query}`],
      };
    } else {
      Connector.relationshipBindings.order[lastStoredQuery].push(`${query}`);
    }

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
    const lastStoredQuery = Condition.lastStoredQuery();

    args.forEach((data) => {
      if (Connector.relationshipBindings.group[lastStoredQuery] === undefined) {
        Connector.relationshipBindings.group = {
          [`${lastStoredQuery}`]: [data],
        };
      } else {
        Connector.relationshipBindings.group[lastStoredQuery].push(data);
      }
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
    const lastStoredQuery = Condition.lastStoredQuery();

    if (Connector.relationshipBindings.group[lastStoredQuery] === undefined) {
      Connector.relationshipBindings.group = {
        [`${lastStoredQuery}`]: [raw],
      };
    } else {
      Connector.relationshipBindings.group[lastStoredQuery].push(raw);
    }

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
    if (args.length === 2) Condition.havingValue(args[0], args[1]);

    // If argument with operator
    if (args.length === 3) Condition.havingValueAndOperator(args[0], args[1], args[2]);

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
    Condition.havingValueAndOperator(column, 'IN', value);
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
    Condition.havingValueAndOperator(column, 'NOT IN', value);
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
    Condition.havingValueAndOperator(column, 'IS', null);
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
    Condition.havingValueAndOperator(column, 'IS NOT', null);
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
    Condition.pushBinding('having', `${column} BETWEEN ${start} AND ${end}`);
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
    Condition.pushBinding('having', `${column} NOT BETWEEN ${start} AND ${end}`);
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
    Condition.havingValueAndOperator(column, '=', value);
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
      Condition.pushBinding('having', `${column} ${operator} ${value}`);
    }

    // If value is string
    if (typeof value === 'string') {
      Condition.pushBinding('having', `${column} ${operator} '${value}'`);
    }

    // If value is object
    if (typeof value === 'object') {
      if (operator.includes(Connector.operators) || operator.includes('IS')) {
        Condition.pushBinding('having', `${column} ${operator} ${value === null ? 'NULL' : value.join(', ')}`);
      }

      if (!operator.includes(Connector.operators) && !operator.includes('IS')) {
        Condition.pushBinding('having', `${column} ${operator} (${value === null ? 'NULL' : value.join(', ')})`);
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
    Condition.pushBinding('mix', `OFFSET ${value}`);

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
      Condition.pushBinding('mix', `LIMIT ${value}`);
    }

    return this;
  }

  queryBuilder(table, storedQuery) {
    const select = `SELECT ${Connector.relationshipBindings.select[storedQuery] === undefined ? '*' : Connector.relationshipBindings.select[storedQuery].join(', ')}`;

    Condition.queryJoinBuilder(storedQuery);
    Condition.queryWhereBuilder(storedQuery);
    Condition.queryOrderByBuilder(storedQuery);
    Condition.queryGroupByBuilder(storedQuery);
    Condition.queryHavingBuilder(storedQuery);

    let mix = '';
    if (Connector.relationshipBindings.mix[storedQuery] !== undefined) {
      mix = Connector.relationshipBindings.mix[storedQuery].join(' ');
    }

    const query = `${select} FROM ${table} ${Relationships.joinGrammar} ${Relationships.whereGrammar} ${Relationships.orderByGrammar} ${Relationships.groupByGrammar} ${Relationships.havingGrammar} ${mix}`;
    return query;
  }

  static pushBinding(statement, value) {
    const lastStoredQuery = Condition.lastStoredQuery();

    if (Connector.relationshipBindings[statement][lastStoredQuery] === undefined) {
      Connector.relationshipBindings[statement] = {
        [`${lastStoredQuery}`]: [value],
      };
    } else {
      Connector.relationshipBindings[statement][lastStoredQuery].push(value);
    }
  }

  static lastStoredQuery() {
    const lastStoredQueryIndex = Relationships.storedQuery.length - 1;
    const lastStoredQuery = Relationships.storedQuery[lastStoredQueryIndex];

    return lastStoredQuery;
  }

  static lastWhere(whereClauses, lastStoredQuery) {
    const lastWhereIndex = Connector.relationshipBindings[whereClauses][lastStoredQuery].length - 1;
    const lastWhere = Connector.relationshipBindings[whereClauses][lastStoredQuery][lastWhereIndex];

    return {
      index: lastWhereIndex,
      query: lastWhere,
    };
  }

  static queryJoinBuilder(storedQuery) {
    if (Connector.relationshipBindings.join[storedQuery] !== undefined) {
      Relationships.joinGrammar = Connector.relationshipBindings.join[storedQuery].join(' ');
    }
  }

  static queryWhereBuilder(storedQuery) {
    if (Connector.relationshipBindings.where[storedQuery] !== undefined) {
      Relationships.whereGrammar = `WHERE ${Connector.relationshipBindings.where[storedQuery].join(' AND ')}`;
    }

    if (Connector.bindings.orWhere[storedQuery] !== undefined) {
      Relationships.whereGrammar = `${Connector.whereGrammar} OR ${Connector.relationshipBindings.orWhere[storedQuery].join(' OR ')}`;
    }
  }

  static queryGroupByBuilder(storedQuery) {
    if (Connector.relationshipBindings.group[storedQuery] !== undefined) {
      Relationships.groupByGrammar = `GROUP BY ${Connector.relationshipBindings.group[storedQuery].join(', ')}`;
    }
  }

  static queryOrderByBuilder(storedQuery) {
    if (Connector.relationshipBindings.order[storedQuery] !== undefined) {
      Relationships.orderByGrammar = `ORDER BY ${Connector.relationshipBindings.order[storedQuery].join(', ')}`;
    }
  }

  static queryHavingBuilder(storedQuery) {
    if (Connector.relationshipBindings.having[storedQuery] !== undefined) {
      Relationships.havingGrammar = `HAVING ${Connector.relationshipBindings.having[storedQuery].join(' AND ')}`;
    }
  }
}

module.exports = new Condition();
