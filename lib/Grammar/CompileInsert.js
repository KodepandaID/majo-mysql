class CompileInsert {
  constructor() {
    this.grammar = '';
    this.fields = [];
    this.values = [];
  }

  compileFields(fields) {
    const arrFields = Object.keys(fields);
    arrFields.forEach((data) => {
      this.fields.push(data);
    });
  }

  compileFieldsArray(fields) {
    const arrKeys = Object.keys(fields);
    arrKeys.forEach((data) => {
      const keys = Object.keys(fields[data]);
      keys.forEach((dataKeys) => {
        if (!this.fields.includes(dataKeys)) {
          this.fields.push(dataKeys);
        }
      });
    });
  }

  compileValues(values) {
    const arrValues = Object.keys(values);
    arrValues.forEach((data) => {
      if (typeof values[data] === 'number' || values[data] === null) {
        this.values.push(values[data]);
      }

      if (typeof values[data] === 'string') {
        this.values.push(`'${values[data]}'`);
      }
    });
  }

  compileValuesArray(values) {
    values.forEach((data) => {
      const value = [];
      this.fields.forEach((dataKey, index) => {
        if (dataKey in data) {
          const tmpValue = typeof data[dataKey] === 'number' || data[dataKey] === null ? data[dataKey] : `'${data[dataKey]}'`;
          value.push(tmpValue);
          if (this.fields.length === (index + 1)) {
            this.values.push(value);
          }
        }

        if (!(dataKey in data)) {
          value.push('DEFAULT');
          if (this.fields.length === (index + 1)) {
            this.values.push(value);
          }
        }
      });
    });
  }

  async runBuild(column, data) {
    await this.compileFields(data);
    await this.compileValues(data);

    this.grammar = await `INSERT INTO ${column} (${this.fields.join(', ')}) VALUES(${this.values.join(', ')})`;

    return this.grammar;
  }

  async runBuildArray(column, data) {
    await this.compileFieldsArray(data);
    await this.compileValuesArray(data);

    this.grammar = `INSERT INTO ${column} (${this.fields.join(', ')}) VALUES`;

    const arrayValueFinal = [];
    this.values.forEach((value) => {
      const stringValue = `(${value.join(', ')})`;
      arrayValueFinal.push(stringValue);
    });

    this.grammar = `${this.grammar} ${arrayValueFinal.join(', ')}`;
    return this.grammar;
  }
}

module.exports = new CompileInsert();
