# Installation
TODO:


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
  /models  -- simple collections of db queries and utilities for employee data
    index.js -- creates a single object with each model as a property
    performance_review.js
    employee.js
  /routes -- defines API endpoints and passes requests to corresponding controllers
    performance_review_routes.js
    employee_routes.js
  index.js -- the main Express app
knexfile.js -- defines all database settings for different environments
package.json -- defines scripts for utilities like migrations and seeds
```
