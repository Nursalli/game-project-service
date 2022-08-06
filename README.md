# Game Project Service

## DB Schema

Below is the database schema of this service:

![](./dbschema.png)

## Setup

Set up your `.env` file align with `.env.sample` given

```.env
NODE_ENV=development
APP_PORT=3010
DB_CONNECTION_STRING=mysql://user:password@localhost:3306/db_name
INITIAL_ADMIN_PASSWORD=admin123
BCRYPT_SALT=8
JWT_SECRET_KEY=somesecret
```

## Install

```sh
$ yarn
# or
$ npm install
```

## DB Setup

```sh
$ yarn db:create
$ yarn db:migrate
$ yarn db:seed:exec
```

## Run

```sh
$ yarn start
# or
$ yarn dev
```

Or you can run in vscode debug mode by pressing `F5`.

## Info

NodeJS: v16.13.1

## Author

- Gregorius Ferry
- Muhammad Nursalli
- Irvan Ariyanto
