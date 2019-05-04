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

  it('Run hasOne() method with condition', (done) => {
    Majo
      .select()
      .from('country')
      .where('Code', 'IDN')
      .hasOne('city', 'city', 'Code', 'CountryCode')
      .hasOne('city', 'kota', 'Code', 'CountryCode', (condition) => {
        condition.select('city.ID', 'city.Name', 'country.Name AS CountryName');
        condition.leftJoin('country', 'city.CountryCode', '=', 'country.Code');
        condition.where('city.Population', '<', 100000);
        condition.orderByRaw('city.Name DESC');
      })
      .first()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run hasOne() method with condition and many data', (done) => {
    Majo
      .select()
      .from('country')
      .where('Code', 'IDN')
      .hasOne('city', 'city', 'Code', 'CountryCode')
      .hasOne('city', 'kota', 'Code', 'CountryCode', (condition) => {
        condition.select('city.ID', 'city.Name', 'country.Name AS CountryName');
        condition.leftJoin('country', 'city.CountryCode', '=', 'country.Code');
        condition.where('city.Population', '<', 100000);
        condition.orderByRaw('city.Name DESC');
      })
      .get()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run hasMany() method with condition', (done) => {
    Majo
      .select()
      .from('country')
      .where('Code', 'IDN')
      .hasMany('city', 'city', 'Code', 'CountryCode')
      .hasMany('city', 'city', 'Code', 'CountryCode', (condition) => {
        condition.select('city.ID', 'city.Name', 'country.Name AS CountryName');
        condition.leftJoin('country', 'city.CountryCode', '=', 'country.Code');
        condition.orderByRaw('city.Name ASC');
        condition.limit(2);
      })
      .first()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run hasOne() method with condition and many data', (done) => {
    Majo
      .select()
      .from('country')
      .where('Code', 'IDN')
      .hasOne('city', 'city', 'Code', 'CountryCode')
      .hasOne('city', 'city', 'Code', 'CountryCode', (condition) => {
        condition.select('city.ID', 'city.Name', 'country.Name AS CountryName');
        condition.leftJoin('country', 'city.CountryCode', '=', 'country.Code');
      })
      .get()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('Run hasMany() method with condition and many data', (done) => {
    Majo
      .select()
      .from('country')
      .where('Code', 'IDN')
      .hasMany('city', 'city', 'Code', 'CountryCode')
      .hasMany('city', 'cities', 'Code', 'CountryCode', (condition) => {
        condition.select('city.ID', 'city.Name', 'country.Name AS CountryName');
        condition.leftJoin('country', 'city.CountryCode', '=', 'country.Code');
        condition.orderByRaw('city.Name DESC');
        condition.limit(2);
      })
      .hasOne('city', 'citi', 'Code', 'CountryCode', (condition) => {
        condition.select('city.ID', 'city.Name', 'country.Name AS CountryName');
        condition.leftJoin('country', 'city.CountryCode', '=', 'country.Code');
        condition.where('city.Population', '<', 100000);
        condition.orderByRaw('city.Name DESC');
      })
      .first()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
