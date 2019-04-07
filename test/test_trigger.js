const Majo = require('../index').connection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'world',
});

describe('Majo Mysql Trigger Testing', () => {
  it('Run createBeforeInsert() method', (done) => {
    Majo
      .schema()
      .withSchema('world')
      .createTable('log_city', (table) => {
        table.increment();
        table.string('description', 255);
        table.dateTime('created_at');
      })
      .then(() => {
        Majo
          .trigger()
          .createBeforeInsert('log_city', 'city', (trigger) => {
            trigger.field('description').value('Insert');
            trigger.field('created_at').value().now();
          })
          .then(() => {
            done();
          })
          .catch((err) => {
            done(err);
          });
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run createBeforeUpdate() method', (done) => {
    Majo
      .trigger()
      .createBeforeUpdate('log_city', 'city', (trigger) => {
        trigger.field('description').value().new('Name');
        trigger.field('created_at').value().now();
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run createBeforeDelete() method', (done) => {
    Majo
      .trigger()
      .createBeforeDelete('log_city', 'city', (trigger) => {
        // Test value with number, sorry for akward value
        trigger.field('description').value(123);
        trigger.field('created_at').value().now();
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run createAfterInsert() method', (done) => {
    Majo
      .trigger()
      .createAfterInsert('log_city', 'city', (trigger) => {
        trigger.field('description').value('Insert');
        trigger.field('created_at').value().now();
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run createAfterUpdate() method', (done) => {
    Majo
      .trigger()
      .createAfterUpdate('log_city', 'city', (trigger) => {
        trigger.field('description').value().old('Name');
        trigger.field('created_at').value().now();
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run createAfterDelete() method', (done) => {
    Majo
      .trigger()
      .createAfterDelete('log_city', 'city', (trigger) => {
        trigger.field('description').value('Delete');
        trigger.field('created_at').value().now();
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run showTriggers() method', (done) => {
    Majo
      .trigger()
      .showTriggers('world')
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run showTrigger() method', (done) => {
    Majo
      .trigger()
      .showTrigger('world', 'before_city_insert')
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run dropTrigger() method', (done) => {
    Majo
      .trigger()
      .dropTrigger('world', 'before_city_insert', 'before_city_update', 'before_city_delete', 'after_city_insert', 'after_city_update', 'after_city_delete')
      .then(() => {
        Majo
          .schema()
          .dropTable('log_city')
          .then(() => {
            done();
          })
          .catch((err) => {
            done(err);
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});
