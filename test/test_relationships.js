const Majo = require('../index').connection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

describe('Majo Mysql Relationships Testing', () => {
  it('Run hasOne() method', (done) => {
    Majo
      .select()
      .from('country')
      .where('Code', 'AUS')
      .hasOne('city', 'Cities', 'Code', 'CountryCode')
      .first()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run hasOne() method with many table', (done) => {
    Majo
      .select()
      .from('country')
      .where('SurfaceArea', '<=', 100)
      .hasOne(
        ['city', 'Kota', 'Code', 'CountryCode'],
        ['countrylanguage', 'Bahasa', 'Code', 'CountryCode'],
      )
      .get()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run hasMany() method', (done) => {
    Majo
      .select()
      .from('country')
      .where('Code', 'AUS')
      .hasMany('city', 'Cities', 'Code', 'CountryCode')
      .first()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run hasMany() method with many table', (done) => {
    Majo
      .select()
      .from('country')
      .where('SurfaceArea', '<=', 100)
      .hasMany(
        ['city', 'Kota', 'Code', 'CountryCode'],
        ['countrylanguage', 'Bahasa', 'Code', 'CountryCode'],
      )
      .get()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
