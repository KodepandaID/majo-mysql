const Builder = require('../index');
const connector = require('./Connection/Connector');

class Trigger {
  showTriggers(database) {
    return new Promise((resolve, reject) => {
      connector
        .mysqlQueryProcess(`SHOW TRIGGERS FROM ${database}`, (results, err) => {
          if (err) reject(err);
          if (!err) resolve(results);
        });
    });
  }
}

module.exports = new Trigger();
