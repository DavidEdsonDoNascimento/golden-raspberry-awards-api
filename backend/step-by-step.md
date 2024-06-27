# NodeJS + Typescript + Prisma + SQLite

## Step By Step of project
### init package.json with:

```js
yarn init -y
```

### install and init typescript

```js
yarn add typescript -D
yarn tsc --init
```

### install express and types

```js
yarn add express
yarn add @types/express -D
```

### install ts-node-dev

```js
yarn add ts-node-dev -D
```
<hr>

* go to tsconfig.json and configure as is in this project

```js
yarn tsc
```
<hr>

### install tsconfig-paths and add in script of package.json

```js
yarn add tsconfig-paths -D
```
* go to package.json and add tsconfig-paths/register in scripts.dev


use the format created in src/routes to create endpoints and the standard use of controllers for functions that will return data from endpoints

### install prisma
```js
yarn add prisma -D
yarn add @prisma/client
```

### library responsible for reading files:
link: https://www.npmjs.com/package/multer
```js
yarn add multer
yarn add @types/multer
```

instantiated in routes as middleware

### connection between prism and SQLite
```js
npx prisma init --datasource-provider sqlite
```

https://www.prisma.io/docs/getting-started/quickstart

created model Movies in schema.prisma

### running migrate dev on prisma
```js
yarn prisma migrate dev
```
created to migrate create_movies in prisma/migrations

### for viewing data in the database via prisma
```js
npx prisma studio
```

### export client to use db
create the client in a directory as done in: src/database/client.ts
