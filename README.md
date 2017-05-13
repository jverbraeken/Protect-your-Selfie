# ProtectYourSelfie
Protect your own online self(ie).

* * *

# Using the project locally
In order to use this project you need to install [node and npm](https://nodejs.org/en/),
[Heroku toolbelt](https://devcenter.heroku.com/articles/heroku-cli) and
[PostgreSQL](https://www.postgresql.org/download/).

First create a new database for the project:
```bash
$ psql
...
postgres=# CREATE DATABASE database_name;
```

Then create `.env` file in the root of the project with the following key-value pairs:
```
DATABASE_URL=postgresql://USERNAME:PASSWORD@localhost/DATABASE_NAME
ENVIRONMENT=development <OR> production
PORT=port number to run on (e.g. 7000)
```

Then install the dependencies:
```bash
$ npm install
```

Then you can build the project using (you can omit `build` to watch for changes), if this doesn't work first use `npm install --global gulp`:
```bash
$ gulp build
```

Then you should initialize the database using:
```bash
$ psql DATABASE_NAME < db_init.sql
```

Finally you can start the server locally using:
```bash
$ heroku local web
```

If you want to run the server without having to manually restart it, follow these steps:
```bash
$ npm install --global nodemon
...
$ heroku local dev
```
