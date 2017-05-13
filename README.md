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
DATABASE_URL=postgresql://USERNAME:PASSWORD@localhost/DB_NAME
ENVIRONMENT="development" or "production"
PORT=port number to run on
```

Then install the dependencies:
```bash
$ npm install
```

Then you can build the project using (you can omit `build` to watch for changes):
```bash
$ gulp build
```

Finally you can start the server locally using:
```bash
$ heroku local web
```
