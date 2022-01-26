# Backend server for vue.js training

## URL

> The server is deployed on heroku:
> https://vue-js-backend.herokuapp.com/api-docs

To trigger a new deployment, please use the [heroku dashboard](https://dashboard.heroku.com/apps/vue-js-backend)

## Build Setup

* Start the server in nominal environment:

``` bash
# install dependencies
$ npm install

# start a postgresql docker in background (this may take some time)
$ docker run --name postgres-vuejs-training -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=myapp -p 5432:5432 -d postgres

# start the server
$ npm run serve
```
Please note that you have to set some environment variables, see [configuration file](./src/config.js).

* Start the server in mocked environment (SQLite3 + mocked omdbapi response):

``` bash
# install dependencies
$ npm install

# start the server
$ npm run start-with-mock
```

## Documentation

The swagger documentation is available on the `/api-docs` route.

Note: You can remove all users from the database with the endpoint `DELETE /users`.

