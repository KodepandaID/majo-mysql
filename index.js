const Builder = require('./lib/Builder');

module.exports = Builder;

Builder
  .schema()
  .withSchema('world')
  .createTable('users')
  .tableIncrement()
  .tableString('name', 255)
  .tableString('username', 50)
  .tableString('phone', 14)
  .runSchema()
  .then((results) => {
    console.log(results);
  });
