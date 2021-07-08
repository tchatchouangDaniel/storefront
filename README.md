# Storefront Backend Project

## Getting Started

- run : yarn install to install the dependencies
- build : yarn run build
- start the server : yarn run start

server run on port : `3000`

## Connect the database

Create a .env file with the following details :

- POSTGRES_HOST= host
- POSTGRES_DB= database name
- POSTGRES_DB_TEST= database name for tests
- POSTGRES_USER= database user username
- POSTGRES_USER_PASSWORD= database user password
- ENV= "dev" or "test"
- BCRYPT_PASSWORD= pepper for bcrypt
- SALT_ROUNDS= salt rounds for bcrypt
- TOKEN_SECRET= secret for jsonwebtoken

After creating that file everything should be working

- I use postgres locally because I didn't manage to connect the server to the database in docker container

## Test with jasmine

Test are run on the test database :

run tests with : yarn run test

- Only the tests for the models are included

## Test endpoints

I added a table for categories.
I added the endpoints for categories in `REQUIREMENTS.md`

So these are the steps to start adding product:

1. create a category
2. create a product
3. create a user
4. create an order

and from there you are good to go.
