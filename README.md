# Golden Raspberry Awards API

This project consists of a RESTful API that works with a list of nominees and winners of the Golden Raspberry Awards Worst Film category in CSV format.
This API is designed to meet Richardson Maturity Level 2.

## Richardson Maturity Model Link for REST APIs

https://rivaildojunior.medium.com/modelo-de-maturidade-de-richardson-para-apis-rest-8845f93b288

## step by step to build a project like this:
./backend/step-by-step.md

## step by step to run the project on your machine:

#### Install dependencies
```js
yarn
```

#### run migrations
```js
yarn prisma migrate dev
```

### Routes created:
* '/' Get documentation (GET)
* '/movies' Sends mass of data to the database (POST with file: search in collections containing the name Get Prize Range)
* '/movies' Gets all movies (GET)
* '/movies/winners' Gets the winning films (GET)
* '/movies/:id' Changes a movie's data using its id (PUT)
* '/movies' Deletes all movies / deletes mass of data from database (DELETE)
* '/producers/prize-range' Gets the set containing the producer with the greatest interval between two consecutive awards, and which
got two awards faster, following the format specification defined in the ./documents/Backend.pdf Specification (GET) file