const Majo = require('../index').connection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'world',
});

describe('Majo Mysql DB Manager Testing', () => {
  it('Run showDatabases() method', (done) => {
    Majo
      .db()
      .showDatabases()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run showDatabase() method', (done) => {
    Majo
      .db()
      .showDatabase('world')
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run showDatabaseInfo() method', (done) => {
    Majo
      .db()
      .showDatabaseInfo('world')
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run showIndexes() method', (done) => {
    Majo
      .db()
      .showIndexes('world')
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run showColumn() method', (done) => {
    Majo
      .db()
      .showColumn('world', 'city')
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run showUsers() method', (done) => {
    Majo
      .db()
      .showUsers()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run showUser() method', (done) => {
    Majo
      .db()
      .showUser('root')
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run createDatabase() method', (done) => {
    Majo
      .db()
      .createDatabase('universe', (database) => {
        database.charset('utf8');
        database.collation('utf8_general_ci');
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run createDatabaseIfNotExists() method', (done) => {
    Majo
      .db()
      .createDatabaseIfNotExists('universe', (database) => {
        database.charset('utf8');
        database.collation('utf8_general_ci');
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run updateDatabase() method', (done) => {
    Majo
      .db()
      .updateDatabase('universe', (database) => {
        database.charset('utf8');
        database.collation('utf8_unicode_ci');
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run renameDatabase() method', (done) => {
    Majo
      .db()
      .renameDatabase('universe', 'superuniverse')
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run dropDatabase() method, to drop superuniverse database', (done) => {
    Majo
      .db()
      .dropDatabase('superuniverse')
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run createUser() with all privileges method', (done) => {
    Majo
      .db()
      .createUser('majo', '%', (user) => {
        user.grantAll();
        user.identified('password');
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run createUser() with privileges method', (done) => {
    Majo
      .db()
      .createUser('majo2', '%', (user) => {
        user.grantCreateUser();
        user.grantEvent();
        user.grantFile();
        user.grantProcess();
        user.grantReload();
        user.grantReplicationClient();
        user.grantReplicationSlave();
        user.grantShowDatabases();
        user.grantShutdown();
        user.grantSuper();
        user.grantCreateTablespace();
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run createUser() with usage privileges method', (done) => {
    Majo
      .db()
      .createUser('majo3', '%', (user) => {
        user.grantUsage();
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run updateUser() with revoke all privileges method', (done) => {
    Majo
      .db()
      .updateUser('majo', '%', (user) => {
        user.revokeAll();
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run updateUser() with revoke privileges method', (done) => {
    Majo
      .db()
      .updateUser('majo2', '%', (user) => {
        user.revokeCreateUser();
        user.revokeEvent();
        user.revokeFile();
        user.revokeProcess();
        user.revokeReload();
        user.revokeReplicationClient();
        user.revokeReplicationSlave();
        user.revokeShowDatabases();
        user.revokeShutdown();
        user.revokeSuper();
        user.revokeCreateTablespace();
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run updateUser() with revoke usage privileges method', (done) => {
    Majo
      .db()
      .updateUser('majo3', '%', (user) => {
        user.revokeUsage();
        user.grantAll();
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run dropUser() method', (done) => {
    Majo
      .db()
      .dropUser('majo', '%')
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run dropUser() method', (done) => {
    Majo
      .db()
      .dropUser('majo2', '%')
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run dropUser() method', (done) => {
    Majo
      .db()
      .dropUser('majo3', '%')
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run cloneDatabase() method', (done) => {
    Majo
      .db()
      .cloneDatabase('world', 'universe')
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run cloneDatabaseStructured() method', (done) => {
    Majo
      .db()
      .cloneDatabaseStructured('world', 'structureduniverse')
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run dropDatabase() method, to dropping universe database', (done) => {
    Majo
      .db()
      .dropDatabase('universe')
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run dropDatabase() method, to dropping structureduniverse database', (done) => {
    Majo
      .db()
      .dropDatabase('structureduniverse')
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
