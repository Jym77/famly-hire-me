# Hiring portal prototype

## Run it

```bash
$ yarn install
$ yarn build
$ yarn dev # starts all three apps

$ yarn test
```

By default, the applicants portal runs on `localhost:5172` and the managers one on `localhost:5173`, with the backend
listening to `localhost:3000`.

## Tooling

Witten using [Ollama](https://ollama.com/), [Pi agent](https://docs.ollama.com/integrations/pi), and [gemma4:31b-cloud model](https://ollama.com/library/gemma4:31b).

The code is Typescript. The frontends are in React with Vite as server. The backend is an express server with 
`better-sqlite3` to model the database. Both use Vitest for tests. There is an action to run tests on PRs.

## Structure

The project consists in two frontends: one for job applicants and one for nursery managers, a shared backend (`server`), 
and a mock database.

The frontend is split in two because the applicants one is publicly available while the manager one is only for logged 
users. The server handles the database connection and requests. The database is a mock that is recreated every time and
not persisted in any way, as this is just a prototype.

Components and utilities libraries are shared between both frontend. 

## Database

The database is assumed to be internal to one group. It contains tables for nurseries, positions, applicants and 
applications. The exact schemas are very light, mostly containing a dummy "data" column that is meant to represent all
the relevant data in possibly several actual columns (for example, a nursery would have a name and address, an applicant
would have name, qualification, CV, …)

The positions are assumed to be specific to one nursery (rather than say "any nursery in city X"), which simplifies the 
schema. Otherwise, a one-to-many mapping table would be needed between positions and nurseries.

The server implements CRUD operations on the Database using a simple REST API (rather than GraphQL, for example). The
sensitive operations are "protected" by a token verification, here as a simple presence check. This is assumed to be 
an actual token verification for logged-in Famly users since only them should perform these operations. Note that 
Applicants and Application can only be created by non-users, not read.

The simple protection also doesn't differentiate between users, it would be more realistic to only allow a given
nursery manager to view data for their nursery while the group manager would need access to everything. 

While the `server` app itself uses a mock database in its tests, the actual frontends connect to the regular server for
their own tests (i.e. there isn't a separated production and test server), this should be solved by separate dotenv files
to use a different server (for end-to-end tests), or a local mock of the server for snapshot and unit tests. The only
server being already more or less a mock, that was skipped…