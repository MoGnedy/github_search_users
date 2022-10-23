# github search users
Search for GitHub users by the programming language they use in their public repositories

## API Docs
https://documenter.getpostman.com/view/19603597/2s84LF3vo2


## How to use ?

- Install docker and docker-compose.
- Copy .env.example to .env file and add the required env variables values.
### Development environment

- Run tests command `docker-compose exec api-dev npm test`
- Build command: `docker compose build api-dev`
- Start app command: `docker compose up api-dev -d`

### Production environement

- Run tests command `docker-compose exec api npm test`
- Build command: `docker compose build api`
- Start app command: `docker compose up api -d`