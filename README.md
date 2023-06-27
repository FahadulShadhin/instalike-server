# instalike_server

APIs for a Instagram-like platform where users can showcase their images.

## API Endpoints (completed):

| Method | URL               | Description             |
| ------ | ----------------- | ----------------------- |
| POST   | api/user/register | Register new user       |
| POST   | api/user/login    | Signin user             |
| GET    | api/user/:id      | Get user information    |
| PUT    | api/user/:id      | Update user information |
| DELETE | api/user/:id      | Delete user account     |

## Setup:

- Prerequisites: `node`, `yarn`, `postgreSQL`
- Clone the repository
- `cd` to root directory
- Install the dependencies: `yarn install`
- Start the server: `yarn dev`
- If you get the following then everythin is in order :)

```bash
>>> Server started at PORT 3000
>>> PostgreSQL connected at PORT 5000
```

### PostgreSQL Setup:

Before running the server setup your postgres database.

- create `.env` in the root directory
- Give your postgres infos in `.env`:

```
PGUSER=<your_postgres_username>
PGHOST=<your_postgres_host>
PGDATABASE=<database_name>
PGPASSWORD=<your_postgres_password>
PGPORT=<your_database_port>
```
