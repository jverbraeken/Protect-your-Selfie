# ProtectYourSelfie
Protect your own online self(ie).

* * *

# Using the project locally
In order to use this project you need to install [node and npm](https://nodejs.org/en/),
[Heroku toolbelt](https://devcenter.heroku.com/articles/heroku-cli) and
[PostgreSQL](https://www.postgresql.org/download/).

First create a new database for the project:
```
$ psql
...
postgres=# CREATE DATABASE database_name;
```

Then create `.env` file in the root of the project with the following key-value pairs:
```
DATABASE_URL=postgresql://USERNAME:PASSWORD@localhost/DATABASE_NAME
ENVIRONMENT=development <OR> production
PORT=port number to run on (e.g. 7000)

AWS_REGION=the AWS region, see http://docs.aws.amazon.com/general/latest/gr/rande.html#apigateway_region
AWS_BUCKET_NAME=the name of the AWS bucket
AWS_ACCESS_KEY_ID=your AWS access key
AWS_SECRET_ACCESS_KEY=your AWS secret access key
```

Then install the dependencies:
```
$ npm install
```

Then you can build the project using (you can omit `build` to watch for changes), if this doesn't work first use `npm install --global gulp`:
```
$ gulp build
```

Then you should initialize the database using:
```
$ psql DATABASE_NAME < db_init.sql postgres
```

Finally you can start the server locally using:
```
$ heroku local web
```

If you want to run the server without having to manually restart it, follow these steps:
```
$ npm install --global nodemon
...
$ heroku local dev
```
