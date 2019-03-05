class Connector {
  constructor() {
    /**
     * The current query value bindings
     *
     * @var {Object}
     */
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

    /**
     * Status query use distinct
     *
     * @var {Boolean}
     */
    this.selectDistinct = false;

    /**
     * The current insert query
     *
     * @var {String}
     */
    this.insertGrammar = null;

    /**
     * The current update query
     *
     * @var {String}
     */
    this.updateGrammar = null;

    /**
     * All of available operator use
     *
     * @var {Array}
     */
    this.operators = [
      '=', '<', '>', '<=', '>=', '<>', '!=', '<=>',
      'like', 'like binary', 'not like', 'ilike',
      '&', '|', '^', '<<', '>>',
      'rlike', 'regexp', 'not regexp',
      '~', '~*', '!~', '!~*', 'similar to',
      'not similar to', 'not ilike', '~~*', '!~~*',
    ];

    /**
     * Targeting table query
     *
     * @var {String}
     */
    this.tables = null;
  }
}

module.exports = new Connector();
