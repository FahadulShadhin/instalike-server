# instalike_server

APIs for a Instagram-like platform where users can showcase their images.

## API Endpoints (completed):

| Method | URL                  | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/user/register` | Register new user       |
| POST   | `/api/user/login`    | Signin user             |
| GET    | `/api/user/:id`      | Get user information    |
| DELETE | `/api/user/:id`      | Delete user account     |
| PUT    | `/api/user/:id`      | Update user information |

## Setup:

- Requires `node >= 18.14.0`, `yarn >= 1.22.19`
- Clone the repository
- `cd` to root directory
- Install the dependencies: `yarn install`
- Start the server: `yarn dev`
- If you get something like the following then everythin is in order :)

  <img alt="output" src="./extras/Screenshot%202023-06-28%20013927.png" width="300">

### PostgreSQL Setup:

Before running the server setup your postgres database.

- Requires `PostgreSQL == 15.3`
- Create `.env` in the root directory
- Give your postgres infos in `.env`:

```
PGUSER=<your_postgres_username>
PGHOST=<your_postgres_host>
PGDATABASE=<your_database_name>
PGPASSWORD=<your_postgres_password>
PGPORT=<your_database_port>
```
