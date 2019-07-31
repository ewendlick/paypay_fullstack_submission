# Installation & Running
cd ./api
npm install
npm run db:migrate (optional: this repo contains the sqlite3 db file)
npm run db:seed (optional: this repo contains the sqlite3 db file)
npm run start

cd ./front
npm install
npm run dev

cd ./admin
npm install
npm run dev

# Accessing the site
By default, the project will run on localhost:8000 for the Employee-facing section ("Front"), and localhost:8001 for the Admin-facing section ("Admin"). However, another random and higher port will be used if 8000/8001 are not available. Please note the output when running.

# Notes

## Technologies used
Vue
Nuxt (SSR mode)
Vuetify 2
Express
Knex

## Folder Structure ('front' and 'admin')

```
/assets -- included assets
  /styles
    base.scss -- "global" styles
/components
/layouts
  default.vue -- container for all pages
  error.vue -- error page
/pages -- main components for each route
/static -- assets accessible via URL
/store -- Vuex store
.env -- holds environmental settings
nuxt.config.js -- Nuxt.js config file
package.json -- defines scripts for running the development server or building the application
```

## Why this layout?
For smaller projects or projects with a small number of engineers, monorepos are more convenient than dealing with multiple repos in that they have all of your code in one place, and don't need to deal with the issue of keeping track of the states of different repos/submodules during deployments.
The package.json in the root is a convenience for you guys so you can run command and this will set itself up and be ready to use

There's a huge amount of similarity between the /front and /admin folders, but that would likely change. Front and admin sites get deployed to different servers, can have different login systems, and may diverge greatly in the future.

## What is missing?
- Authentication
- Authorization
- API-side validation
- Login
- Tests
- *Icons

## Assumptions
I assume that the Front and Admin sections would diverge in the future or be loaded from different domains, which is why I made two separate directories. I know that a lot of the code is identical, and it makes me extremely uncomfortable to have duplicated code.

I assume that this isn't going to production, so you'll find tons of TODOs littering the code. If TODOs need to go to production, I have my team add the PIC name to the TODO as well as an estimated completion date, otherwise I do my best to have the code tell a story rather than using comments.

It's assumed that nobody would be malciously using this system. There's no login system in place, and the API doesn't have any checks.

## Goals
Try out Knex
Learn about upgrading Vuetify from 1.5 to 2
Create an API that I can repurpose for another project
Make something impressive with CSS3 animations (Did not implement)
Create a package.json script to do everything as opposed to running something from within each folder of the project (Did not implement)

## Difficulties
*Icons

Icons are not displaying. They should work out of the box with Vuetify, but something strange is going on. I've tried importing the icon stylesheets in a number of places and have confirmed that they load. I have tried both Material Design and FontAwesome
To take a look at all of my attempts, please see the "feature/icons" branch
