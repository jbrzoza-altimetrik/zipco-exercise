# Quick start
### Required dependencies
- docker

### Run api with database using docker-compose
`docker compose up -d`

App is running on http://localhost:3000

# Local development

### Required dependencies
- node 18.12.1
- docker

## Database
- Run databse using docker-compose

`docker compose up db -d`

## Backend

- Install dependencies

`npm install`

- Install Prisma 

`npm install prisma -g`

- Generate prisma artifacts

`npx prisma generate`

- Run application

`npm run start:dev`


# Testing
- Running unittest `npm run test`
- There is provided postman collection with sample requests
