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
### Select
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
#### Select table .from() or .table()
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
  })
```
```sql
SELECT * FROM users
```
Or
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
  })
```
```sql
SELECT * FROM users
```
