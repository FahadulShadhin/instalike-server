# instalike_server

APIs for a Instagram-like platform where users can showcase their images.

## API Endpoints (completed):

| Method | URL                  | Description                                                   | Login Required |
| ------ | -------------------- | ------------------------------------------------------------- | -------------- |
| POST   | `/api/user/register` | Register new user                                             | No             |
| POST   | `/api/user/login`    | Sign in user                                                  | No             |
| GET    | `/api/user/:id`      | Get user information                                          | Yes            |
| DELETE | `/api/user/:id`      | Delete user account                                           | Yes            |
| PUT    | `/api/user/:id`      | Update user information                                       | Yes            |
| POST   | `/api/image`         | Upload image                                                  | Yes            |
| DELETE | `/api/image/:imgId`  | User can delete an image if he/she is the owner of that image | Yes            |

## Setup:

- Requires `node >= 18.14.0` and `yarn >= 1.22.19`
- Clone the repository
- `cd` to root directory
- Install the dependencies: `yarn install`
- Start the server: `yarn dev`
- If you get something like the following then everythin is in order ✌️

  <img alt="output" src="./extras/Screenshot%202023-06-28%20013927.png" width="300">

### PostgreSQL Setup:

Before running the server setup your postgres database.

- Requires `PostgreSQL >= 15.3`
- Create `.env` in the root directory
- Give your postgres infos in `.env`:

```
PGUSER=<your_postgres_username>
PGHOST=<your_postgres_host>
PGDATABASE=<your_database_name>
PGPASSWORD=<your_postgres_password>
PGPORT=<your_database_port>
```
