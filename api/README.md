# Installation
npm install
npm run db:migrate (optional: this repo contains the sqlite3 db file)
npm run db:seed (optional: this repo contains the sqlite3 db file)
npm run start

## Folder Structure

```
/config
  database.js -- loads the knexfile using settings for the current environment
/db
  /migrations
  /seeds
/server
  /controllers -- business logic for handling API endpoints
    performance_review_controller.js
    employee_controller.js
  /helpers -- modules for common functions that sit outside controllers/models
  /routes -- defines API endpoints and passes requests to corresponding controllers
    performance_review_routes.js
    employee_routes.js
  index.js -- the main Express app
knexfile.js -- defines all database settings for different environments
package.json -- defines scripts for utilities like migrations and seeds
```
