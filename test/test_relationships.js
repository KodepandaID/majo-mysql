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
        condition.where('city.Population', '?', 100000);
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
        condition.select('ID', 'Name');
        condition.where({
          District: 'Sumatera Utara',
          Name: 'Medan',
        });
        condition.orderByRaw('Name DESC');
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
      .hasMany('city', 'city2', 'Code', 'CountryCode', (condition) => {
        condition.select('city.ID', 'city.Name', 'country.Name AS CountryName');
        condition.leftJoin('country', 'city.CountryCode', '=', 'country.Code');
        condition.orderBy('city.Name', 'ASC');
        condition.limit(2);
        condition.offset(0);
      })
      .hasMany('city', 'city3', 'Code', 'CountryCode', (condition) => {
        condition.select('city.ID', 'city.Name', 'country.Name AS CountryName');
        condition.joinRaw('INNER JOIN country ON city.CountryCode = country.Code');
        condition.orderByDesc('city.Name');
        condition.take(2);
        condition.skip(0);
      })
      .hasMany('city', 'city4', 'Code', 'CountryCode', (condition) => {
        condition.select('city.ID', 'city.Name', 'country.Name AS CountryName');
        condition.innerJoin('country', 'city.CountryCode', '=', 'country.Code');
        condition.latest('city.Name');
        condition.limit(2);
      })
      .hasMany('city', 'city5', 'Code', 'CountryCode', (condition) => {
        condition.select('city.ID', 'city.Name', 'country.Name AS CountryName');
        condition.rightJoin('country', 'city.CountryCode', '=', 'country.Code');
        condition.oldest('city.Name');
        condition.limit(2);
      })
      .hasMany('city', 'city6', 'Code', 'CountryCode', (condition) => {
        condition.select('city.ID', 'city.Name', 'country.Name AS CountryName');
        condition.leftOuterJoin('country', 'city.CountryCode', '=', 'country.Code');
        condition.limit(2);
      })
      .hasMany('city', 'city7', 'Code', 'CountryCode', (condition) => {
        condition.select('city.ID', 'city.Name', 'country.Name AS CountryName');
        condition.rightOuterJoin('country', 'city.CountryCode', '=', 'country.Code');
        condition.limit(2);
      })
      .hasMany('city', 'city8', 'Code', 'CountryCode', (condition) => {
        condition.select('city.ID', 'city.Name', 'country.Name AS CountryName');
        condition.crossJoin('country', 'city.CountryCode', '=', 'country.Code');
        condition.whereEmptyString('city.Name');
        condition.whereBetween('city.Population', 127800, 1780000);
        condition.whereNotBetween('city.Population', 127800, 1780000);
        condition.orWhereBetween('city.Population', 80000, 1270000);
        condition.orWhereNotBetween('city.Population', 80000, 1270000);
        condition.whereColumn('city.Name', 'city.District');
        condition.orWhereColumn('city.Name', 'city.District');
        condition.limit(2);
      })
      .hasMany('city', 'city9', 'Code', 'CountryCode', (condition) => {
        condition.whereColumn({ Name: 'city.District' });
        condition.orWhereColumn({ Name: 'city.District' });
        condition.whereColumn('city.Name', '=', 'city.District');
        condition.orWhereColumn('city.Name', '=', 'city.District');
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
        condition.whereNull('city.Name');
        condition.whereNotNull('District');
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
      .hasMany('city', 'citi', 'Code', 'CountryCode', (condition) => {
        condition.select('city.ID', 'city.Name', 'country.Name AS CountryName');
        condition.distinct();
        condition.leftJoin('country', 'city.CountryCode', '=', 'country.Code');
        condition.where('city.Population', '<', 100000);
        condition.orderByRaw('city.Name DESC');
      })
      .hasMany('city', 'citi2', 'Code', 'CountryCode', (condition) => {
        condition.whereIn('Population', [186800, 127800]);
        condition.whereIn('District', 'Sumatera Utara');
        condition.whereIn('District', ['Sumatera Utara', 'West Java']);
        condition.whereIn('Population', 127800);
        condition.whereIn('Population', null);
      })
      .hasMany('city', 'citi3', 'Code', 'CountryCode', (condition) => {
        condition.whereNotIn('Population', [186800, 127800]);
        condition.whereNotIn('District', 'Sumatera Utara');
        condition.whereNotIn('District', ['Sumatera Utara', 'West Java']);
        condition.whereNotIn('Population', 127800);
        condition.whereNotIn('Population', null);
      })
      .hasMany('city', 'JumlahKota', 'Code', 'CountryCode', (condition) => {
        condition.count('ID');
      })
      .hasMany('city', 'Populasi', 'Code', 'CountryCode', (condition) => {
        condition.sum('city.Population', 'JumlahPopulasi');
        condition.min('city.Population', 'MinimalPopulasi');
        condition.max('city.Population', 'MinimalPopulasi');
        condition.avg('city.Population', 'RataRataPopulasi');
      })
      .get()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('hasRow()', (done) => {
    Majo
      .select('Name', 'CountryCode')
      .from('city')
      .where('CountryCode', 'AFG')
      .hasRow('city', 'total_population', 'population', 'CountryCode', 'CountryCode', (condition) => {
        condition.sum('Population', 'population');
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
