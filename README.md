# Game Project Service

## API Documentation
```sh
https://documenter.getpostman.com/view/5473913/VUjQkPgX
```
## DB Schema

Below is the database schema of this service:

![](./dbschema.png)

## Setup

Set up your `.env` file align with `.env.sample` given

```.env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgres://username:password@localhost:5432/db_name
INITIAL_ADMIN_PASSWORD=admin123
BCRYPT_SALT=8
JWT_SECRET_KEY=somesecret
PGSSLMODE=no-verify
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

## Setup Prettier

Installation

1. Click on the extensions icon in VS Code
2. Search for `prettier`
3. You will see the extension from Prettier
4. Click on the install button
Hit the Reload button or restart the VS Code, once the extension is installed

Usage

1. To automatically format the file on save, In Visual Studio Code, press `Control + Shift + P` or `Command + Shift + P (Mac)` to open the command palette and type setting and then select Preferences: Open User Settings option.
2. Search for format on save setting and check the checkbox.

## Author

- Gregorius Ferry
- Muhammad Nursalli
- Irvan Ariyanto
