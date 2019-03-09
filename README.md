# MajoDB Mysql
> **MajoDB Mysql Builder is query builder with expressive code that makes your day more enjoyable**

You can use this query builder for Mysql and MariaDB then require NodeJS version 8+. 

MajoDB is available for use under [MIT LICENSE](https://github.com/LordAur/majodb-mysql-builder/blob/master/LICENSE)

You can report bugs and discuss features on the [GitHub issues page](https://github.com/LordAur/majodb-mysql-builder/issues), or send tweets to [@LordAur](https://twitter.com/LordAur).

## Features
* Full featured query
* Schema builders (WIP)
* Expressive method

## Installation (WIP)
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
If you want get single row from query results as Object, you can use **.first()** method.
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
### Query Builders
### Select - .select(columns)
#### Specifying A Select Clause
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
#### Full Outer Join - .fullOuterJoin(tableName, joinColumn, operator, selectColumn)
```js
majo
  .select('users.*', 'contacts.phone')
  .table('users')
  .fullOuterJoin('contacts', 'users.id', '=', 'contacts.id')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT users.*, contacts.phone FROM users FULL OUTER JOIN contacts ON users.id = contacts.user_id
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
#### Simple where - .where(fieldName, operator, value)
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
