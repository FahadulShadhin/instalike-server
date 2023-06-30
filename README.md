# instalike_server

APIs for a Instagram-like platform where users can showcase their images.

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

## Data Schema:

<img alt="db schema" src="./extras/dbSchema.png">

## API Endpoints (completed):

| Method | URL                                        | Description                                                   | Login Required |
| ------ | ------------------------------------------ | ------------------------------------------------------------- | -------------- |
| POST   | `/api/user/register`                       | Register new user                                             | ❌             |
| POST   | `/api/user/login`                          | Sign in user                                                  | ❌             |
| GET    | `/api/user/:id`                            | Get user information                                          | ✅             |
| DELETE | `/api/user/:id`                            | Remove user account (set status to `deactivated`)             | ✅             |
| PUT    | `/api/user/:id`                            | Update user information                                       | ✅             |
| POST   | `/api/image`                               | Upload image                                                  | ✅             |
| GET    | `/api/image?page={page_num}&limit={limit}` | Get paginated images by offset and limit                      | ❌             |
| GET    | `/api/image/:imgId`                        | Get image details                                             | ❌             |
| DELETE | `/api/image/:imgId`                        | User can delete an image if he/she is the owner of that image | ✅             |
| GET    | `/api/admin`                               | Admin can view all users list                                 | ✅             |
| PATCH  | `/api/admin/:userId`                       | Admin can edit user status                                    | ✅             |

## Issues & Todos:

- Refresh token for authentication.
- Email confirmation for user registration.
- Implement forgot password.
- Improve profile update as for now it requires to put all the fields.
- Add actual image as binary instead of file path?
- Implement front-end for the app
