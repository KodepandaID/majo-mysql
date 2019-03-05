class Compiler {
  constructor() {
    this.grammar = null;
  }

  static compileFields(fields) {
    const arrField = [];
    const keyFields = Object.keys(fields);
    keyFields.forEach((data) => {
      arrField.push(data);
    });

    return arrField;
  }

  static compileFieldsArray(fields) {
    const arrValue = [];
    const keyFields = Object.keys(fields);
    keyFields.forEach((data) => {
      const keys = Object.keys(fields[data]);
      keys.forEach((dataKeys) => {
        if (!arrValue.includes(dataKeys)) {
          arrValue.push(dataKeys);
        }
      });
    });

    return arrValue;
  }

  static compileValues(values) {
    const arrValues = [];
    const keyFields = Object.keys(values);
    keyFields.forEach((data) => {
      if (typeof values[data] === 'number' || values[data] === null) {
        arrValues.push(values[data]);
      }

      if (typeof values[data] === 'string') {
        arrValues.push(`'${values[data]}'`);
      }
    });

    return arrValues;
  }

  static compileValuesArray(fields, values) {
    const arrValues = [];
    values.forEach((data, indexValues) => {
      const value = [];
      fields.forEach((dataKey, index) => {
        if (dataKey in data) {
          const tmpValue = typeof data[dataKey] === 'number' || data[dataKey] === null ? data[dataKey] : `'${data[dataKey]}'`;
          value.push(tmpValue);
          if (fields.length === (index + 1)) {
            arrValues.push(value);
            if (values.length === (indexValues + 1)) {
              return arrValues;
            }
          }
        }

        if (!(dataKey in data)) {
          value.push('DEFAULT');
          if (fields.length === (index + 1)) {
            arrValues.push(value);
            if (values.length === (indexValues + 1)) {
              return arrValues;
            }
          }
        }
      });
    });
  }

  async compileInsert(column, data) {
    const fields = await Compiler.compileFields(data);
    const values = await Compiler.compileValues(data);

    this.grammar = `INSERT INTO ${column} (${fields.join(', ')}) VALUES(${values.join(', ')})`;
    return this.grammar;
  }

  async compileInsertArray(column, data) {
    const fields = await Compiler.compileFieldsArray(data);
    const values = await Compiler.compileValuesArray(fields, data);

    this.grammar = `INSERT INTO ${column} (${fields.join(', ')}) VALUES`;

    const arrayValueFinal = [];
    await values.forEach((value) => {
      const stringValue = `(${value.join(', ')})`;
      arrayValueFinal.push(stringValue);
    });

    this.grammar = `${this.grammar} ${arrayValueFinal.join(', ')}`;
    return this.grammar;
  }

  compileUpdate(column, field, value) {
    this.grammar = `UPDATE ${column} SET ${field} = ${typeof value === 'number' || value === null ? value : `'${value}'`}`;
    return this.grammar;
  }

  async compileUpdateArray(column, data) {
    const fields = await this.compileFieldsArray(data);

    this.grammar = `UPDATE ${column} SET`;

    const arrValueFinal = [];
    fields.forEach((field) => {
      arrValueFinal.push(`${field} = ${typeof data[0][field] === 'number' || data[0][field] === null ? data[0][field] : `'${data[0][field]}'`}`);
    });

    this.grammar = `${this.grammar} ${arrValueFinal.join(', ')}`;
    return this.grammar;
  }
}

module.exports = new Compiler();
