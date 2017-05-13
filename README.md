# ProtectYourSelfie
Protect your own online self(ie).

* * *

# Using the project locally
In order to use this project you need to install [node and npm](https://nodejs.org/en/) and the
[Heroku toolbelt](https://devcenter.heroku.com/articles/heroku-cli).

First you should create `.env` file in the root of the project with the following key-value pairs:
```
ENVIRONMENT="development" or "production"
PORT=port number to run on
```

First install the dependencies:
```bash
$ npm install
```

Then you can build the project using (you can omit `build` to watch for change):
```bash
$ gulp build
```

Finally you can start the server locally using:
```bash
$ heroku local web
```
