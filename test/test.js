const Majo = require('../index').connection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

describe('Majo Mysql Testing', () => {
  describe('# Testing Query Builder', () => {
    it('Retrieving results with get() method', (done) => {
      Majo
        .select()
        .from('city')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('Retrieving results with first() method', (done) => {
      Majo
        .select()
        .from('city')
        .first()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('Retrieving results with pluck() method', (done) => {
      Majo
        .select()
        .from('city')
        .pluck('Name')
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('select() method with custom select clause', (done) => {
      Majo
        .select('ID', 'Name')
        .from('city')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('distint() method', (done) => {
      Majo
        .select()
        .distinct()
        .from('city')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('count() method', (done) => {
      Majo
        .table('city')
        .count()
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('count() method with as a spesific column', (done) => {
      Majo
        .table('city')
        .count('*', 'total_city')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('countDistinct() method', (done) => {
      Majo
        .table('city')
        .countDistinct('CountryCode')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('countDistinct() method with as a spesific column', (done) => {
      Majo
        .table('city')
        .countDistinct('CountryCode', 'total_city')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('avg() method', (done) => {
      Majo
        .table('city')
        .avg('Population')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('avg() method wit as a spesific column', (done) => {
      Majo
        .table('city')
        .avg('Population', 'average_population')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('sum() method', (done) => {
      Majo
        .table('city')
        .sum('Population')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('sum() method with as a spesific column', (done) => {
      Majo
        .table('city')
        .sum('Population', 'total_population')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('min() method', (done) => {
      Majo
        .table('city')
        .min('Population')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('min() method with as a spesific column', (done) => {
      Majo
        .table('city')
        .min('Population', 'total_minimal_population')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('max() method', (done) => {
      Majo
        .table('city')
        .max('Population')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('max() method with as a spesific column', (done) => {
      Majo
        .table('city')
        .max('Population', 'total_max_column')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('join() method', (done) => {
      Majo
        .select('city.*', 'country.Continent')
        .from('city')
        .join('country', 'city.CountryCode', '=', 'country.Code')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('join() method with custom join type', (done) => {
      Majo
        .select('city.*', 'country.Continent')
        .from('city')
        .join('country', 'city.CountryCode', '=', 'country.Code', 'left')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('joinRaw() method', (done) => {
      Majo
        .select('city.*', 'country.Continent')
        .from('city')
        .joinRaw('INNER JOIN country ON city.CountryCode = country.Code')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('innerJoin() method', (done) => {
      Majo
        .select('city.*', 'country.Continent')
        .from('city')
        .innerJoin('country', 'city.CountryCode', '=', 'country.Code')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('leftJoin() method', (done) => {
      Majo
        .select('city.*', 'country.Continent')
        .from('city')
        .leftJoin('country', 'city.CountryCode', '=', 'country.Code')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('rightJoin() method', (done) => {
      Majo
        .select('city.*', 'country.Continent')
        .from('city')
        .rightJoin('country', 'city.CountryCode', '=', 'country.Code')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('leftOuterJoin() method', (done) => {
      Majo
        .select('city.*', 'country.Continent')
        .from('city')
        .leftOuterJoin('country', 'city.CountryCode', '=', 'country.Code')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('rightOuterJoin() method', (done) => {
      Majo
        .select('city.*', 'country.Continent')
        .from('city')
        .rightOuterJoin('country', 'city.CountryCode', '=', 'country.Code')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('crossJoin() method', (done) => {
      Majo
        .select('city.*', 'country.Continent')
        .from('city')
        .crossJoin('country', 'city.CountryCode', '=', 'country.Code')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('where() method', (done) => {
      Majo
        .table('city')
        .where('Name', 'Kabul')
        .andWhere('Name', 'like', '%Mazar%')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('where() method with operator', (done) => {
      Majo
        .table('city')
        .where('Name', '!=', 'Kabul')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('where() method with not available operator', (done) => {
      Majo
        .table('city')
        .where('Name', 'look', 'Kabul')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('where() method with like operator', (done) => {
      Majo
        .table('city')
        .where('Name', 'like', '%Mazar%')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('whereRaw() method', (done) => {
      Majo
        .from('city')
        .whereRaw('Name = \'Kabul\'')
        .andWhere('CountryCode', '!=', null)
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('orWhere() method', (done) => {
      Majo
        .from('city')
        .where({
          Name: 'Kabul',
          CountryCode: 'AFG',
        })
        .orWhere('CountryCode', 'PSE')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('orWhere() method with operator', (done) => {
      Majo
        .table('city')
        .where({
          Name: 'Kabul',
          CountryCode: 'AFG',
        })
        .orWhere('Population', '>', 80000)
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('orWhere() method with not available operator', (done) => {
      Majo
        .table('city')
        .where({
          Name: 'Kabul',
          CountryCode: 'AFG',
        })
        .orWhere('Population', 'look', 80000)
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('orWhere() method with object argument', (done) => {
      Majo
        .table('city')
        .where({
          Name: 'Kabul',
          CountryCode: 'AFG',
        })
        .orWhere({
          Name: 'Gaza',
          CountryCode: 'PSE',
        })
        .andOrWhere('CountryCode', 'PSE')
        .andOrWhere('CountryCode', '?', 'IDN')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('orWhere() method with object argument', (done) => {
      Majo
        .table('city')
        .where({
          Name: 'Kabul',
          CountryCode: 'AFG',
        })
        .orWhere({
          Name: 'Gaza',
          CountryCode: 'PSE',
        })
        .andOrWhere({
          Name: 'Hebron',
          CountryCode: 'PSE',
        })
        .andOrWhere('Name', 'like', '%Gaza%')
        .makeQuery()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('orWhereBetween() method', (done) => {
      Majo
        .table('city')
        .where({
          Name: 'Kabul',
          CountryCode: 'AFG',
        })
        .orWhereBetween('Population', 80000, 1270000)
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('orWhereNotBetween() method', (done) => {
      Majo
        .table('city')
        .where({
          Name: 'Kabul',
          CountryCode: 'AFG',
        })
        .orWhereNotBetween('Population', 80000, 1270000)
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('orWhereColumn() method', (done) => {
      Majo
        .table('city')
        .where({
          Name: 'Kabul',
          CountryCode: 'AFG',
        })
        .orWhereColumn('Name', 'District')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('orWhereColumn() method with operator', (done) => {
      Majo
        .table('city')
        .where({
          Name: 'Kabul',
          CountryCode: 'AFG',
        })
        .orWhereColumn('Name', '!=', 'District')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('orWhereColumn() method with object', (done) => {
      Majo
        .table('country')
        .where({
          Name: 'Aruba',
        })
        .orWhereColumn({
          Name: 'Continent',
          Continent: 'Region',
        })
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('whereIn() method', (done) => {
      Majo
        .table('city')
        .whereIn('Population', [186800, 127800])
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('whereIn() method with array string', (done) => {
      Majo
        .table('city')
        .whereIn('CountryCode', ['USA', 'PSE'])
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('whereIn() method with string value', (done) => {
      Majo
        .table('city')
        .whereIn('CountryCode', 'USA')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('whereIn() method with number value', (done) => {
      Majo
        .table('city')
        .whereIn('Population', 127800)
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('whereIn() method with null value', (done) => {
      Majo
        .table('country')
        .whereIn('GNP', null)
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('whereNotIn() method', (done) => {
      Majo
        .table('city')
        .whereNotIn('Population', [186800, 127800])
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('whereNotIn() method with array string', (done) => {
      Majo
        .table('city')
        .whereNotIn('CountryCode', ['USA', 'PSE'])
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('whereNotIn() method with string value', (done) => {
      Majo
        .table('city')
        .whereNotIn('CountryCode', 'USA')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('whereNotIn() method with number value', (done) => {
      Majo
        .table('city')
        .whereNotIn('Population', 127800)
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('whereNotIn() method with null value', (done) => {
      Majo
        .table('country')
        .whereNotIn('GNP', null)
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('whereNull() method', (done) => {
      Majo
        .table('country')
        .whereNull('GNP')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('whereNotNull() method', (done) => {
      Majo
        .table('country')
        .whereNotNull('GNP')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('whereEmptyString() method', (done) => {
      Majo
        .table('city')
        .whereEmptyString('Name')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('whereBetween() method', (done) => {
      Majo
        .table('city')
        .whereBetween('Population', 127800, 1780000)
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('whereNotBetween() method', (done) => {
      Majo
        .table('city')
        .whereNotBetween('Population', 127800, 1780000)
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('whereColumn() method', (done) => {
      Majo
        .table('city')
        .whereColumn('Name', 'District')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('whereColumn() method with operator', (done) => {
      Majo
        .table('city')
        .whereColumn('Name', '!=', 'District')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('whereColumn() method with object argument', (done) => {
      Majo
        .table('country')
        .whereColumn({
          Name: 'Continent',
          Continent: 'Region',
        })
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('whereExists() method', (done) => {
      Majo
        .table('city')
        .whereExists()
        .table('country')
        .whereColumn('city.CountryCode', 'country.Code')
        .endWhereExists()
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('whereExists() method with first results', (done) => {
      Majo
        .table('city')
        .whereExists()
        .table('country')
        .whereColumn('city.CountryCode', 'country.Code')
        .endWhereExists()
        .first()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('whereNotExists() method', (done) => {
      Majo
        .table('city')
        .whereNotExists()
        .table('country')
        .whereColumn('city.CountryCode', 'country.Code')
        .endWhereNotExists()
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('orderBy() method', (done) => {
      Majo
        .table('city')
        .orderBy('Population')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('orderBy() method with custom by clause', (done) => {
      Majo
        .table('city')
        .orderBy('Population', 'DESC')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('orderByDesc() method', (done) => {
      Majo
        .table('city')
        .orderByDesc('Population')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('orderByRaw() method', (done) => {
      Majo
        .table('city')
        .orderByRaw('Population DESC')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('latest() method', (done) => {
      Majo
        .table('city')
        .latest('Population')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('oldest() method', (done) => {
      Majo
        .table('city')
        .oldest('Population')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('groupBy() method', (done) => {
      Majo
        .table('city')
        .groupBy('CountryCode')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('groupBy() method with much arguments', (done) => {
      Majo
        .table('city')
        .groupBy('CountryCode', 'Population')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('groupByRaw() method', (done) => {
      Majo
        .table('city')
        .groupByRaw('CountryCode, Population')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('having() method', (done) => {
      Majo
        .table('city')
        .groupBy('CountryCode')
        .having('CountryCode', 'AFG')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('having() method with operator', (done) => {
      Majo
        .table('city')
        .groupBy('CountryCode')
        .having('Population', '>', 70000)
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('havingIn() method', (done) => {
      Majo
        .table('city')
        .groupBy('Population')
        .havingIn('Population', [127800, 1780000])
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('havingNotIn() method', (done) => {
      Majo
        .table('city')
        .groupBy('CountryCode')
        .havingNotIn('Population', [127800, 1780000])
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('havingNull() method', (done) => {
      Majo
        .table('country')
        .groupBy('Code')
        .havingNull('GNP')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('havingNotNull() method', (done) => {
      Majo
        .table('country')
        .groupBy('Code')
        .havingNotNull('GNP')
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('havingBetween() method', (done) => {
      Majo
        .table('city')
        .groupBy('CountryCode')
        .havingBetween('Population', 127800, 1780000)
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('havingNotBetween() method', (done) => {
      Majo
        .table('city')
        .groupBy('CountryCode')
        .havingNotBetween('Population', 127800, 1780000)
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('havingExists() method', (done) => {
      Majo
        .table('city')
        .groupBy('CountryCode')
        .havingExists()
        .table('country')
        .whereColumn('city.CountryCode', 'country.Code')
        .endHavingExists()
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('havingNotExists() method', (done) => {
      Majo
        .table('city')
        .groupBy('CountryCode')
        .havingNotExists()
        .table('country')
        .whereColumn('city.CountryCode', 'country.Code')
        .endHavingNotExists()
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('offset() method and limit() method', (done) => {
      Majo
        .table('city')
        .limit(10)
        .offset(0)
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('skip() method and take() method', (done) => {
      Majo
        .table('city')
        .take(10)
        .skip(0)
        .get()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('insert() method with object value', (done) => {
      Majo
        .table('city')
        .insert({
          Name: 'Test',
          CountryCode: 'AFG',
          District: 'Test',
          Population: 1000,
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('insert() method with array object value', (done) => {
      Majo
        .table('city')
        .insert([
          {
            Name: 'TestArray1',
            CountryCode: 'USA',
            District: 'Test',
          },
          {
            Name: 'TestArray2',
            CountryCode: 'USA',
            District: 'Test',
            Population: 1000,
          },
        ])
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('insertGetId() method', (done) => {
      Majo
        .table('city')
        .insertGetId({
          Name: 'Test2',
          CountryCode: 'AFG',
          District: 'Test2',
          Population: 1000,
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('update() method with value number', (done) => {
      Majo
        .table('city')
        .where('Name', 'Test')
        .update('Population', 5000)
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('update() method with value string', (done) => {
      Majo
        .table('city')
        .where('Name', 'Test')
        .update('District', 'TestDistrict')
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('update() method with object value', (done) => {
      Majo
        .table('city')
        .where('Name', 'Test')
        .update({
          CountryCode: 'ABW',
          Population: 5000,
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('delete() method', (done) => {
      Majo
        .table('city')
        .where('Name', 'like', '%Test%')
        .delete()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('increment() method', (done) => {
      Majo
        .table('city')
        .increment('Population')
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('increment() method with value', (done) => {
      Majo
        .table('city')
        .increment('Population', 2)
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('increment() method with object value', (done) => {
      Majo
        .table('country')
        .increment({
          Population: 2,
          Capital: 2,
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('decrement() method', (done) => {
      Majo
        .table('city')
        .decrement('Population')
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('decrement() method with value', (done) => {
      Majo
        .table('city')
        .decrement('Population', 2)
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('decrement() method with object value', (done) => {
      Majo
        .table('country')
        .decrement({
          Population: 2,
          Capital: 2,
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('truncate() method', (done) => {
      Majo
        .truncate('countrylanguage')
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('columnInfo() method', (done) => {
      Majo
        .columnInfo('city')
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('rawQuery() method', (done) => {
      Majo
        .rawQuery('SELECT * FROM city')
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe('# Testing Schema Builder', () => {
    it('Run analyzeTable() method', (done) => {
      Majo
        .schema()
        .withSchema('world')
        .analyzeTable('city')
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('Run checkTable() method', (done) => {
      Majo
        .schema()
        .withSchema('world')
        .checkTable('city')
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('Run optimizeTable() method', (done) => {
      Majo
        .schema()
        .withSchema('world')
        .optimizeTable('city')
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('Run checksumTable() method', (done) => {
      Majo
        .schema()
        .withSchema('world')
        .checksumTable('city')
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('Run repairTable() method', (done) => {
      Majo
        .schema()
        .withSchema('world')
        .repairTable('city')
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('createTable() method and withSchema() method', (done) => {
      Majo
        .schema()
        .withSchema('world')
        .createTable('dbTestWithSchema', (table) => {
          table.increment();
          table.string('test_with_charset').charset('utf8').default('testing');
          table.string('test_with_collation').collation('utf8_unicode_ci').comment('coba test comment');
          table.enum('test_number', ['easy', 'hard']).default('easy');
          table.string('test_with_nullable').nullable();
          table.string('test_with_not_nullable').nullable(false);
          table.integer('test_with_unsigned').unsigned();
          table.timeStamp('test_with_current').useCurrent();
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('createTable() method without withSchema() method', (done) => {
      Majo
        .schema()
        .createTable('dbtest', (table) => {
          table.increment();
          table.integer('test_int');
          table.tinyInteger('test_tinyint');
          table.smallInteger('test_smallint');
          table.mediumInteger('test_mediumint');
          table.bigInteger('test_bigint');
          table.binary('test_binary');
          table.boolean('test_boolean');
          table.char('test_char');
          table.date('test_date');
          table.dateTime('test_datetime');
          table.decimal('teest_decimal');
          table.double('test_double');
          table.enum('test_enum', ['easy', 'hard']);
          table.float('test_float');
          table.geometry('test_geometry');
          table.geometryCollection('test_geometry_collection');
          table.ipAddress('test_ip_address');
          table.json('test_json');
          table.lineString('test_linestring');
          table.longText('test_longtext');
          table.macAddress('test_mac_address');
          table.mediumText('test_medium_text');
          table.multiLineString('test_multi_linestring');
          table.multiPoint('test_multipoint');
          table.multiPolygon('test_multipolygon');
          table.point('test_point');
          table.polygon('test_polygon');
          table.rememberToken();
          table.string('test_string');
          table.text('test_text');
          table.time('test_time');
          table.timeStamp('test_timestamp');
          table.timestamps();
          table.unsignedBigInteger('test_unsigned_bigint');
          table.unsignedDecimal('test_unsigned_decimal');
          table.unsignedInteger('test_unsigned_int');
          table.unsignedMediumInteger('test_unsigned_mediumint');
          table.unsignedSmallInteger('test_unsigned_smallint');
          table.unsignedTinyInteger('test_unsigned_tinyint');
          table.uuid('test_uuid');
          table.year('test_year');
          table.setEngine();
          table.setCharset();
          table.setCollation();
          table.setComment('Testing comment');
          table.setAutoIncrement();
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('createTable() method with tinyIncrement()', (done) => {
      Majo
        .schema()
        .withSchema('world')
        .createTable('dbTestTinyIncrement', (table) => {
          table.tinyIncrement();
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('createTable() method with smallIncrement()', (done) => {
      Majo
        .schema()
        .withSchema('world')
        .createTable('dbTestSmallIncrement', (table) => {
          table.smallIncrement();
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('createTable() method with mediumIncrement()', (done) => {
      Majo
        .schema()
        .withSchema('world')
        .createTable('dbTestMediumIncrement', (table) => {
          table.mediumIncrement();
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('createTable() method with bigIncrement()', (done) => {
      Majo
        .schema()
        .withSchema('world')
        .createTable('dbTestBigIncrement', (table) => {
          table.bigIncrement();
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('createTable() method with index key', (done) => {
      Majo
        .schema()
        .withSchema('world')
        .createTable('test', (table) => {
          table.integer('id').primary();
          table.string('username', 50).unique();
          table.string('email', 100).index();
          table.string('name');
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('createTable() method with foreign key', (done) => {
      Majo
        .schema()
        .createTable('testforeign', (table) => {
          table.integer('id');
          table.integer('ids');
          table.string('username', 50).unique();
          table.string('email', 100).unique();
          table.string('name');
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('createTable() method with foreign key', (done) => {
      Majo
        .schema()
        .createTable('testforeign2', (table) => {
          table.integer('id').primary();
          table.string('fk_username', 50).unique();
          table.foreign('fk_username')
            .references('username').on('testforeign')
            .onDelete('cascade');
          table.string('fk_email', 100).unique();
          table.string('name');
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('createTable() method with foreign key', (done) => {
      Majo
        .schema()
        .createTable('testforeign3', (table) => {
          table.integer('id').primary();
          table.string('username', 50).unique();
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('createTable() method with foreign key', (done) => {
      Majo
        .schema()
        .createTable('testforeign4', (table) => {
          table.integer('id').primary();
          table.string('username', 50).unique();
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('createTable() method with foreign key', (done) => {
      Majo
        .schema()
        .createTable('testforeign5', (table) => {
          table.integer('id').primary();
          table.string('username', 50).unique();
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('createTable() method with foreign key', (done) => {
      Majo
        .schema()
        .createTable('testforeign6', (table) => {
          table.integer('id').primary();
          table.string('username', 50).unique();
          table.foreign('username')
            .references('username').on('testforeign5')
            .onUpdate('cascade');
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('createTable() method with foreign key', (done) => {
      Majo
        .schema()
        .createTable('testforeign7', (table) => {
          table.integer('id').primary();
          table.string('username', 50).unique();
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('createTable() method with foreign key', (done) => {
      Majo
        .schema()
        .createTable('testforeign8', (table) => {
          table.integer('id').primary();
          table.string('username', 50).unique();
          table.foreign('username')
            .references('username').on('testforeign7')
            .onDelete('cascade');
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('createTable() method with engine MyISAM', (done) => {
      Majo
        .schema()
        .withSchema('world')
        .createTable('test_spatial', (table) => {
          table.point('spatial_point').nullable(false);
          table.point('spatial_point2').spatial();
          table.setEngine('MyISAM');
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('createTable() method with autoIncrement()', (done) => {
      Majo
        .schema()
        .withSchema('world')
        .createTable('dbTestAutoIncrement', (table) => {
          table.integer('id').autoIncrement();
          table.string('test1').unique();
          table.string('test2');
          table.string('test3');
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('updateTable() method and change table configuration', (done) => {
      Majo
        .schema()
        .updateTable('city', (table) => {
          table.setComment('tester');
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('updateTable() method', (done) => {
      Majo
        .schema()
        .updateTable('dbTestAutoIncrement', (table) => {
          table.dropColumn('test1');
          table.dropColumn(['test2', 'test3']);
          table.string('test4');
          table.string('test5');
          table.string('test6');
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('updateTable() method with renameIndex() and renameUnique()', (done) => {
      Majo
        .schema()
        .withSchema('world')
        .updateTable('test', (table) => {
          table.renameUnique('username', 'test_username_unique', 'test_uname_unique');
          table.renameIndex('email', 'test_email_index', 'test_user_email_index');
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('updateTable() method with drop and set primary', (done) => {
      Majo
        .schema()
        .updateTable('dbTestWithSchema', (table) => {
          table.dropPrimary('id');
          table.primary('test_with_unsigned');
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('updateTable() method set primary composite keys', (done) => {
      Majo
        .schema()
        .updateTable('testforeign', (table) => {
          table.primary('id', 'ids');
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('updateTable() method with change() method', (done) => {
      Majo
        .schema()
        .updateTable('dbTestAutoIncrement', (table) => {
          table.string('test4', 5).change();
          table.string('test5').afterColumn('id');
          table.string('test6').first();
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('updateTable() method with foreign key update', (done) => {
      Majo
        .schema()
        .updateTable('testforeign4', (table) => {
          table.foreign('username')
            .references('username').on('testforeign3')
            .onUpdate('cascade');
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('updateTable() method with renameColumn() method only', (done) => {
      Majo
        .schema()
        .updateTable('test', (table) => {
          table.renameColumn('name', 'Name');
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('updateTable() method with spatial() and dropSpatial()', (done) => {
      Majo
        .schema()
        .updateTable('test_spatial', (table) => {
          table.spatial('spatial_point');
          table.dropSpatial('spatial_point2');
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('updateTable() method with drop foreign key', (done) => {
      Majo
        .schema()
        .updateTable('testforeign8', (table) => {
          table.dropForeign('username');
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('updateTable() method with dropUnique() and dropIndex()', (done) => {
      Majo
        .schema()
        .updateTable('test', (table) => {
          table.dropUnique('uname');
          table.dropIndex('user_email');
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('dropTable() method', (done) => {
      const removeDB = ['dbTestTinyIncrement', 'dbTestSmallIncrement', 'dbTestMediumIncrement', 'dbTestBigIncrement', 'dbTestAutoIncrement', 'dbTestWithSchema', 'test', 'test_spatial'];
      removeDB.forEach((table, index) => {
        Majo
          .schema()
          .dropTable(table)
          .then(() => {
            if (removeDB.length === (index + 1)) {
              done();
            }
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    it('dropTable() method for table testforeign2 and testforeign', (done) => {
      Majo
        .schema()
        .dropTable('testforeign2')
        .then(() => {
          Majo
            .schema()
            .dropTable('testforeign')
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

    it('dropTable() method for table testforeign4 and testforeign3', (done) => {
      Majo
        .schema()
        .dropTable('testforeign4')
        .then(() => {
          Majo
            .schema()
            .dropTable('testforeign3')
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

    it('dropTable() method for table testforeign5 and testforeign6', (done) => {
      Majo
        .schema()
        .dropTable('testforeign6')
        .then(() => {
          Majo
            .schema()
            .dropTable('testforeign5')
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

    it('dropTable() method for table testforeign8 and testforeign7', (done) => {
      Majo
        .schema()
        .dropTable('testforeign8')
        .then(() => {
          Majo
            .schema()
            .dropTable('testforeign7')
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

    it('renameTable() method', (done) => {
      Majo
        .schema()
        .renameTable('dbtest', 'newdbtest')
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('dropTableIfExists() method', (done) => {
      Majo
        .schema()
        .dropTableIfExists('newdbtest')
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('hasTable() method', (done) => {
      Majo
        .schema()
        .hasTable('country')
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('hasColumn() method', (done) => {
      Majo
        .schema()
        .hasColumn('city', 'Name')
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
