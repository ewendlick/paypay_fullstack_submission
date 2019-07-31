# Quick start
npm run
TODO: actually implement this

# Installation
If you do not wish to install via the Quick start(TODO, link), you may alternatively install via each package.json file
The 'npm run' command will set everything up for you, but if you want more fine-grained control, please do the following:

# Running
By default, the project will run on localhost:8000 for the Employee-facing section, and localhost:8001 for the Admin-facing section. However, another random and higher port will be used if 8000/8001 are not available. Please note the output when running.

# Notes

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
- Icons

## Where are all of the components?
There's the Vuetify components, but this project doesn't need to be stratified across a number of components. It just has the src/pages/index.vue, and layouts/*.vue files.

## Technologies used
Vue
Nuxt (SSR)
Vuetify 2
Express
Knex

## Assumptions
I assume that the Front and Admin sections would diverge in the future or be loaded from different domains, which is why I made two separate directories. I know that a lot of the code is identical, and it makes me extremely uncomfortable to have duplicated code.

## Goals
Try out Knex
Learn about upgrading Vuetify from 1.5 to 2
Create an API that I can repurpose for another project
Make something impressive with CSS3 animations
Create a package.json script to do everything as opposed to running something from within each folder of the project

## Difficulties
Icons are not displaying. They should work out of the box with Vuetify, but something is going on. I've tried importing the icon stylesheets in a number of places and have confirmed that they load. I have tried both Material Design and Fontawesome
