class JoinClause {
  constructor() {
    this.join = [];
  }

  type(joinType) {
    this.join.push(`${joinType.toUpperCase()} JOIN`);

    return this;
  }

  on(table) {
    this.join.push(`${table} ON`);

    return this;
  }

  where(joinColumn, operator = '=', selectColumn) {
    this.join.push(`${joinColumn} ${operator} ${selectColumn}`);

    return this;
  }

  buildJoin(table, joinColumn, operator, selectColumn, type) {
    this.type(type);
    this.on(table);
    this.where(joinColumn, operator, selectColumn);

    return this.join.join(' ');
  }
}

module.exports = new JoinClause();
