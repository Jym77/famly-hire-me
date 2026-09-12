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

The repository is a yar monorepo. The code is Typescript. The frontends are in React with Vite as server. The backend 
is an express server with `better-sqlite3` to model the database. All use Vitest for tests. There is a CI workflow 
to run tests on PRs. The repository has not been set up for branch protection (requires PRs, review, and passing CI).

## Structure

The project consists in two frontends: one for job applicants and one for nursery managers, a shared backend (`server`), 
and a mock database.

The frontend is split in two because the applicants one is publicly available while the manager one is only for logged 
users only. The server handles the database connection and requests. The database is a mock that is recreated every 
time and not persisted in any way, as this is just a prototype.

Components and utilities libraries are shared between both frontends. 

## Database

The database is assumed to be internal to one group. It contains tables for nurseries, positions, applicants and 
applications. The exact schemas are very light, mostly containing a dummy "data" column that is meant to represent all
the relevant data in possibly several actual columns (for example, a nursery would have a name and address, an applicant
would have name, qualification, CV, …)

The positions are assumed to be specific to one nursery (rather than say "any nursery in city X"), which simplifies the 
schema. Otherwise, a one-to-many mapping table would be needed between positions and nurseries. This is under the 
assumption that each nursery manager handles their own personal, rather than them being shared across all nurseries 
of a group.

The server implements CRUD operations on the Database using a simple REST API (rather than GraphQL, for example). The
sensitive operations are "protected" by a token verification, here as a simple presence check. This is assumed to be 
an actual token verification for logged-in Famly users since only them should perform these operations. Note that 
Applicants and Applications can only be created by non-users, not read. This means that it is not possible to review
ones own application after submission. However, this also means that there is no need to create a user for 
submitting an application, thus easing the process.

The simple protection also doesn't differentiate between users (managers), it would be more realistic to only allow a
given nursery manager to view only data for their nursery while the group manager would need access to everything. 

While the `server` app itself uses a mock database in its tests, the actual frontends connect to the regular server for
their own tests (i.e. there isn't a separated production and test server), this should be solved by separate dotenv files
to use a different server (for end-to-end tests), or a local mock of the server for snapshot and unit tests. The only
server being already more or less a mock, that was skipped…

## Frontends

The frontends are essentially SPAs showing views of the corresponding tables, with clickable cards for details and 
interaction.

## Shortcomings

With time running low and tokens running high, this is left in a half-done state… The most obvious shortcomings 
being (I initially intended to implement the first two):
* The managers app is only half done, there is no way to actually edit the data (create new openings, close them, 
  change the status of applications, …)
* Which effectively also prevents writing end-to-end tests using browser automation (e.g., check that an application 
  can be accepted or rejected, and that the database is updated accordingly).
* There is no verification on applications at all, which is a huge security hole for DOS attacks or similar. At 
  least some sort of captcha verification should be used. And actual sanitation of the input data.
* IDs are created sequentially, which may create attack vectors by letting malicious actors "guess" an existing ID.
* This handles personal data (Applicants info) and needs GDPR review and notification. This may end up requiring 
  users to be created for Applicants as an easy way to provide a "delete my data" option.
* There is no Time To Live set anywhere, which may end up polluting the database.
* The managers app should pre-select only the relevant data for each nursery manager; in a 300 nurseries group, 
  individual managers do not care about all of them.
* The search functionalities are as barebone as the single "data" field is in every table… A more elaborate schema 
  would lead to more useful search (by location or job title, typically).
