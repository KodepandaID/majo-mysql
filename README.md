# MajoDB Mysql
> **MajoDB Mysql Builder is query builder with expressive code that makes your day more enjoyable**

You can use this query builder for Mysql and MariaDB then require NodeJS version 8+. 

MajoDB is available for use under [MIT LICENSE](https://github.com/LordAur/majodb-mysql-builder/blob/master/LICENSE)

You can report bugs and discuss features on the [GitHub issues page](https://github.com/LordAur/majodb-mysql-builder/issues), or send tweets to [@LordAur](https://twitter.com/LordAur).

## Features
* Full featured query
* Expressive method
* Relationships (WIP)
* Schema builders (WIP)

## Installation
```shell
npm i majodb-mysql-builder
```

## How to use
### Initializing the library
The MajoDB module is itself a function which takes a configuration object for Majo.
```js
const majo = require('majodb-mysql-builder')
  .connection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
  });
```

### Retrieving results
#### Retrieving All Rows From A Table
You can get query results as a Array with use **.get()** method.
```js
majo
  .select()
  .from('users')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
#### Retrieving A Single Row / Column From A Table
If you want get single row from query result as Object, you can use **.first()** method.
```js
majo
  .select()
  .from('users')
  .first()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
#### Pluck - .pluck(column)
If you want get one column for the result, you can use   **.pluck()** method
```js
majo
  .select()
  .from('users')
  .pluck('email')
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
### Query Builders

### Select Clause
#### Select - .select(columns)
If you want select all columns from a database table.
```js
majo
  .select()
  .from('users')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users
```
You may not always want to select all columns from a database table. Using the **select** method, you can specify a custom select clause for the query:
```js
majo
  .select('name', 'email as user_email')
  .from('users')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT name, email AS user_email FROM users
```
The **distinct** method allows you to force the query to return distinct results:
```js
majo
  .table('users')
  .distinct()
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT DISTINCT * FROM users
```
#### Table - .table(table name)
You use **.table()** or **from()** for selecting spesific table.
```js
majo
  .table('users')
  .select()
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users
```
#### From - .from(table name)
```js
majo
  .select()
  .from('users')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users
```
### Aggregates
The query builder also provides a variety of aggregate methods such as **count**, **max**, **min**,  **avg**, and **sum**.
#### Count - .count(columns, asColumn)
```js
majo
  .table('users')
  .count()
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT COUNT(*) FROM users
```
Or you can **count** as a spesific column like this:
```js
majo
  .table('users')
  .count('*', 'user_total')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT COUNT(*) AS user_total FROM users
```
Also you can count row with **distinct** method like this:
```js
majo
  .table('users')
  .countDistinct('id', 'user_total')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT COUNT(DISTINCT id) FROM users
```
#### Avg - .avg(column, asColumn)
```js
majo
  .table('orders')
  .avg('price')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT AVG(*) FROM orders
```
Or you can get **avg** from spesific column, with combine method.
```js
majo
  .table('orders')
  .avg('price', 'average_price')
  .where('status', true)
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT AVG(*) AS average_price FROM orders WHERE status = true
```
#### Sum - .sum(column, asColumn)
```js
majo
  .table('orders')
  .sum('orderId')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT SUM(orderId) FROM orders
```
#### Min - .min(column, asColumn)
```js
majo
  .table('orders')
  .min('price')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT MIN(price) FROM orders
```
#### Max - .max(column, asColumn)
```js
majo
  .table('orders')
  .max('price')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT MAX(price) FROM orders
```
### Joins
The Majo query builder may also be used to write **join** statements
#### Inner Join - .join(tableName, joinColumn, operator, selectColumn)
```js
majo
  .select('users.*', 'contacts.phone')
  .table('users')
  .join('contacts', 'users.id', '=', 'contacts.user_id')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT users.*, contacts.phone FROM users INNER JOIN contacts ON users.id = contacts.user_id
```
#### Join Raw - .joinRaw(query)
If you want write it raw, you can use **joinRaw()** method like this:
```js
majo
  .select('users.*', 'contacts.phone')
  .table('users')
  .joinRaw('INNER JOIN contacts ON users.id = contacts.user_id')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT users.*, contacts.phone FROM users INNER JOIN contacts ON users.id = contacts.user_id
```
#### Left Join - .leftJoin(tableName, joinColumn, operator, selectColumn)
```js
majo
  .select('users.*', 'contacts.phone')
  .table('users')
  .leftJoin('contacts', 'users.id', '=', 'contacts.id')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT users.*, contacts.phone FROM users LEFT JOIN contacts ON users.id = contacts.user_id
```
#### Right Join - .rightJoin(tableName, joinColumn, operator, selectColumn)
```js
majo
  .select('users.*', 'contacts.phone')
  .table('users')
  .rightJoin('contacts', 'users.id', '=', 'contacts.id')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT users.*, contacts.phone FROM users RIGHT JOIN contacts ON users.id = contacts.user_id
```
#### Left Outer Join - .leftOuterJoin(tableName, joinColumn, operator, selectColumn)
```js
majo
  .select('users.*', 'contacts.phone')
  .table('users')
  .leftOuterJoin('contacts', 'users.id', '=', 'contacts.id')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT users.*, contacts.phone FROM users LEFT OUTER JOIN contacts ON users.id = contacts.user_id
```
#### Right Outer Join - .rightOuterJoin(tableName, joinColumn, operator, selectColumn)
```js
majo
  .select('users.*', 'contacts.phone')
  .table('users')
  .rightOuterJoin('contacts', 'users.id', '=', 'contacts.id')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT users.*, contacts.phone FROM users RIGHT OUTER JOIN contacts ON users.id = contacts.user_id
```
#### Cross Join - .crossJoin(tableName, joinColumn, operator, selectColumn)
```js
majo
  .select('users.*', 'contacts.phone')
  .table('users')
  .crossJoin('contacts', 'users.id', '=', 'contacts.id')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT users.*, contacts.phone FROM users CROSS JOIN contacts ON users.id = contacts.user_id
```
### Where Clause
The Majo query builders may also be used to write **where** statements. The basics style where statements use three arguments, field, operator and value.
#### Simple where - .where(column, operator, value)
```js
majo
  .table('users')
  .where('email', '=', 'test@mail.com')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
You can also without use operator with where statements like this:
```js
majo
  .table('users')
  .where('email', 'test@mail.com')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
You can write it raw like this:
```js
majo
  .table('users')
  .whereRaw(`email = 'test@mail.com'`)
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE email = 'test@mail.com'
```
You may use a variety of other operators when writing a **where** clause:
```js
majo
  .table('users')
  .where('email', 'like', '%@gmail.com%')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE email LIKE '%@gmail.com%'
```
```js
majo
  .table('orders')
  .where('price', '>=', 5000)
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders WHERE price >= 5000
```
You may also pass an object of conditions to the **where** statement
```js
majo
  .table('users')
  .where({
     first_name: 'Yudha',
     last_name: 'Pratama',
  })
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE first_name = 'Yudha' AND last_name = 'Pratama'
```
You may be used **Or Where** conditions and used **orWhere** method like this:
```js
majo
  .table('orders')
  .where('price', '=', 5000)
  .orWhere('price', '=', 10000)
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders WHERE price = 5000 OR price = 10000
```
#### Where In - .whereIn(column, [array] | string | number)
```js
majo
  .table('users')
  .whereIn('id', [1, 5, 9])
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE id IN (1, 5, 9)
```
#### Where Not In - .whereNotIn(column, [array] | string | number)
```js
majo
  .table('users')
  .whereNotIn('id', [1, 5, 9])
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE id NOT IN (1, 5, 9)
```
#### Where Null - .whereNull(column)
```js
majo
  .table('users')
  .whereNull('last_name')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE last_name IS NULL
```
#### Where Not Null - .whereNotNull(column)
```js
majo
  .table('users')
  .whereNotNull('last_name')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE last_name IS NOT NULL
```
#### Where Empty String - .whereEmptyString(column)
```js
majo
  .table('users')
  .whereEmptyString('last_name')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE last_name = ''
```
#### Where Between - .whereBetween(column, startNumber, endNumber)
```js
majo
  .table('orders')
  .whereBetween('price', 5000, 10000)
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders WHERE price BETWEEN 5000 AND 10000
```
#### Where Not Between - .whereNotBetween(column, startNumber, endNumber)
```js
majo
  .table('orders')
  .whereNotBetween('price', 5000, 10000)
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders WHERE price NOT BETWEEN 5000 AND 10000
```
You may be used **whereBetwwen** method and **whereNotBetween** with OR statement like this
```js
majo
  .table('orders')
  .whereNotBetween('price', 1000, 2000)
  .whereNotBetween('price', 5000, 10000)
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders WHERE price NOT BETWEEN 1000 AND 2000 OR price NOT BETWEEN 5000 AND 10000
```
#### Where Column - .whereColumn(firstColumn, operator, secondColumn)
The **whereColumn** method may be used to verify that two columns are equal
```js
majo
 .table('users')
 .whereColumn('first_name', 'last_name')
 .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE first_name = last_name
```
Or you can use with operator like this:
```js
majo
 .table('users')
 .whereColumn('first_name', '!=' 'last_name')
 .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE first_name != last_name
```
Or used much columns checking
```js
majo
 .table('users')
 .whereColumn({
  first_name: 'last_name',
  username: 'email'
 })
 .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE first_name = last_name AND username = email
```
You may be used **whereColumn** methid with OR statement like this:
```js
majo
 .table('users')
 .whereNotNull('last_name')
 .orWhereColumn('first_name', '!=' 'last_name')
 .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE last_name NOT NULL OR WHERE first_name != last_name
```
#### Where Exists - .whereExists()
The **whereExists** method allows you to write where exists SQL clauses. You can write SQL clause with same line without inside block.
```js
majo
  .table('users')
  .whereExists()
  .table('orders')
  .whereColumn('users.id', 'orders.user_id')
  .endWhereExists()
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE EXISTS ( SELECT * FROM orders WHERE users.id = orders.user_id )
```
Remember you should write **endWhereExists** method to end the use of **whereExists** SQL clause.
#### Where Not Exists - .whereNotExists()
```js
majo
  .table('users')
  .whereNotExists()
  .table('orders')
  .whereColumn('users.id', 'orders.user_id')
  .endWhereNotExists()
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE NOT EXISTS ( SELECT * FROM orders WHERE users.id = orders.user_id )
```
Remember you should write **endWhereNotExists** method to end the use of **whereNotExists** SQL clause.

### Ordering, Grouping, Limit & Offset
The Majo query builders may also be used to write **order by**, **group by**, **offset** and **limit** statement.
#### Order By - .orderBy(column, [by clause])
```js
majo
  .table('users')
  .orderBy('created_date')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
Or you can use by clause like this
```js
majo
  .table('users')
  .orderBy('created_date', 'ASC')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users ORDER BY created_date ASC
```
You can write it raw like this:
```js
majo
  .table('users')
  .orderByRaw('created_date ASC')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users ORDER BY created_date ASC
```
#### Order By Desc - .orderByDesc(column)
```js
majo
  .table('users')
  .orderByDesc('created_date')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users ORDER BY created_date DESC
```
#### Latest - .latest(column)
You can use **latest** method without any argument. The **latest** method argument by default is **created_date**
```js
majo
  .table('users')
  .latest('created_date')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users ORDER BY created_date DESC
```
#### Oldest - .oldest(column)
You can use **oldest** method without any argument. The **oldest** method argument by default is **created_date**
```js
majo
  .table('users')
  .oldest('created_date')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users ORDER BY created_date ASC
```
#### Group By - .groupBy(columns)
```js
majo
  .table('orders')
  .groupBy('status')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders GROUP BY status
```
Or you can use much fields for grouping like this
```js
majo
  .table('orders')
  .groupBy('status', 'created_date')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```js
majo
  .table('orders')
  .groupByRaw('status, created_date')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders GROUP BY status, created_date
```
### Having Clause
The Majo query builders may also be used to write **having** method. Having clause used to search keywords with aggregates
#### Having - .having(column, [operator], value)
```sql
majo
  .table('orders')
  .groupBy('price')
  .having('price', 5000)
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders GROUP BY price HAVING price = 5000
```
Or you can uuse **having** method without operator, like this:
```sql
majo
  .table('orders')
  .groupBy('price')
  .having('price', '>', 5000)
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders GROUP BY price HAVING price > 5000
```
#### Having In - .havingIn(column, values)
```sql
majo
  .table('orders')
  .groupBy('price')
  .havingIn('price', [5000, 1000])
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders GROUP BY price HAVING price IN (5000, 1000)
```
#### Having Not In - .havingNotIn(column, values)
```sql
majo
  .table('orders')
  .groupBy('price')
  .havingNotIn('price', [5000, 1000])
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders GROUP BY price HAVING price NOT IN (5000, 1000)
```
#### Having Null - .havingNull(column)
```sql
majo
  .table('orders')
  .groupBy('price')
  .havingNull('client_name')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders GROUP BY price HAVING client_name IS NULL
```
#### Having Not Null - .havingNotNull(column)
```sql
majo
  .table('orders')
  .groupBy('price')
  .havingNotNull('client_name')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders GROUP BY price HAVING client_name IS NOT NULL
```
#### Having Between - .havingBetween(column, values)
```sql
majo
  .table('orders')
  .groupBy('price')
  .havingBetween('price', [5000, 1000])
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders GROUP BY price HAVING price BETWEEN 5000 AND 10000
```
#### Having Not Between - .havingNotBetween(column, values)
```sql
majo
  .table('orders')
  .groupBy('price')
  .havingNotBetween('price', [5000, 10000])
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders GROUP BY price HAVING price NOT BETWEEN 5000 AND 10000
```
#### Having Exists - .havingExists()
The **havingExists** method allows you to write having exists SQL clauses. You can write SQL clause with same line without inside block.
```js
majo
  .table('users')
  .groupBy('id')
  .havingExists()
  .table('orders')
  .whereColumn('users.id', 'orders.user_id')
  .endHavingExists()
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users GROUP BY id HAVING EXISTS ( SELECT * FROM orders WHERE users.id = orders.user_id )
```
Remember you should write **endHavingExists** method to end the use of **havingExists** SQL clause.
#### Having Not Exists - .havingNotExists()
```js
majo
  .table('users')
  .groupBy('id')
  .havingNotExists()
  .table('orders')
  .whereColumn('users.id', 'orders.user_id')
  .endHavingExists()
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users GROUP BY id HAVING NOT EXISTS ( SELECT * FROM orders WHERE users.id = orders.user_id )
```
Remember you should write **endHavingNotExists** method to end the use of **havingNotExists** SQL clause.

### Offset & Limit
The Majo query builder may be used to **offset** and **limit** statement.
#### Offset - .offset(number) And Limit - .limit(number)
```js
majo
  .table('users')
  .limit(100)
  .offset(0)
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users LIMIT 100 OFFSET 0
```
Or you can use **skip** for change **offset** method, and use **take** for change **limit** method.
```js
majo
  .table('users')
  .take(100)
  .skip(0)
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users LIMIT 100 OFFSET 0
```
### Inserts
The Majo query builder also provides an **insert** method for inserting records into the database table. The **insert** method accepts an object names and values:
#### Insert - .insert(object | string argument)
```js
majo
  .table('users')
  .insert({ 
    first_name: 'Test',
    last_name: 'User'
  });
```
```sql
INSERT INTO users (first_name, last_name) VALUES ('Test', 'User')
```
Or you can insert with argument like this:
```js
majo
  .table('users')
  .insert('first_name', 'Test');
```
```sql
INSERT INTO users (first_name) VALUES ('Test')
```
You may also want to inserted much values like this:
```js
majo
  .table('users')
  .insert([
    {
      first_name: 'Test',
      last_name: 'User 1',
    },
    {
      first_name: 'Test',
      last_name: 'User 2',
    }
  ]);
```
```sql
INSERT INTO users (first_name, last_name) VALUES ('Test', 'User 1'), ('Test', 'User 2')
```
And then if you want get last inserted id, you can use **insertgetId** method, like this:
```js
majo
  .table('users')
  .insertGetId({ 
    first_name: 'Test',
    last_name: 'User'
  })
  .first()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
INSERT INTO users (first_name, last_name) VALUES ('Test', 'User')
```
### Updates
The Majo query builder also provides an **update** method for updating records. The **update** method accepts an object names and values:
### Update - .update(object | string argument)
```js
majo
  .table('users')
  .where('user_id', 1)
  .update({
    first_name: 'Test',
    last_name: 'User',
  });
```
```sql
UPDATE users SET first_name = 'Test', last_name = 'User'
```
Or you can write with string argument like this
```js
majo
  .table('users')
  .where('user_id', 1)
  .update('first_name', 'Test');
```
```sql
UPDATE users SET first_name = 'Test'
```
### Increment & Decrement
The Majo query builder also provides convenient methods for incrementing or decrementing the value of a given column.
#### Increment - .increment(column, [number])
```js
majo
  .table('users')
  .increment('votes');
```
```sql
UPDATE users SET votes = votes + 1
```
Or you can custom value like this:
```js
majo
  .table('users')
  .increment('votes', 10);
```
```sql
UPDATE users SET votes = votes + 10
```
#### Decrement - .decrement(column, [number])
```js
majo
  .table('users')
  .decrement('votes');
```
```sql
UPDATE users SET votes = votes - 1
```
Or you can custom value like this:
```js
majo
  .table('users')
  .decrement('votes', 10);
```
```sql
UPDATE users SET votes = votes - 10
```
### Deletes
The Majo query builder also provides an **delete** method to remove records from database table.
#### Delete - .delete()
```js
majo
  .table('users')
  .where('user_id', 1)
  .delete();
```
```sql
DELETE FROM users WHERE user_id = 1
```
#### Truncate - .truncate(table)
If you want clear the data from your database table, you can use **truncate** method.
```js
majo
  .truncate('users')
```
```sql
TRUNCATE TABLE users
```
### Another Methods
#### Column Info
With Majo query builder, you can get all information from your database table like field name, type field and other information.
```js
majo
  .columnInfo('users')
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SHOW COLUMNS FROM users
```
