# Backend server for vue.js training

## URL

> The server is deployed here :
> https://vue-js-backend.herokuapp.com/

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# start a postgresql docker in background (this may take some time)
$ docker run --name postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=myapp -p 5432:5432 -d postgres

# start the server
$ npm start

```

## Documentation

The swagger documentation is available on the /api-docs API