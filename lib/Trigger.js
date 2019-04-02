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

  showTrigger(database, triggerName) {
    return new Promise((resolve, reject) => {
      connector
        .mysqlQueryProcess(`SHOW TRIGGERS FROM ${database} WHERE \`Trigger\` = '${triggerName}'`, (results, err) => {
          if (err) reject(err);
          if (!err) resolve(results[0]);
        });
    });
  }
}

module.exports = new Trigger();
