
# Hello Hero

## About
a peer to peer recognition platform.

## Issues

## Contributing
see [CONTRIBUTING.md](https://github.com/Inserso/hello-hero/blob/master/CONTRIBUTING.md)

## Workflow

## Installation

1. fork & clone this repository
2. Ensure you have node installed
3. Run `npm install` in the root directory (this will install bower dependencies too)
4. Ensure you have mongodb installed and running: https://docs.mongodb.com/master/installation
5. Run gulp task -- see Gulp Task sections (run gulp then gulp watch-dev or gulp watch-prod)

## Project Structure

    / hello-hero
    |
    |---- package.json
    |
    |---- bower.json
    |
    |---- gulpfile.js
    |
    |---- Dockerfile
    |
    |---- docker-compose.yml
    |
    |---- .travis.yml
    |
    |----- templates
    |
    |---- /app
    |     |
    |     |---- index.html
    |     |---- app.js
    |     |
    |     |---- /styles
    |     |     |
    |     |     |---- _settings.scss
    |     |     |---- app.scss
    |     |
    |     |---- /components
    |           |
    |           ...
    |
    |---- /server
    |     |  
    |     |---- /config
    |     |     | ------ routes.js
    |     |     | ------ middleware.js
    |     |     | ------ helpers.js
    |     |
    |     |---- server.js
    |   
    |---- /dist.dev
    |      
    |---- /dist.prod
    |
    |---- /tests

#### [package.json](https://github.com/Inserso/hello-hero.git/blob/master/package.json)

Server-side (command-line) dependencies.

#### [bower.json](https://github.com/Inserso/hello-hero.git/blob/master/bower.json)

Client-side (browser) dependencies.

#### [gulpfile.js](https://github.com/Inserso/hello-hero.git/blob/master/gulpfile.js)

Where all the Gulp streams and tasks are specified. Tasks are outlined below.

#### [/app](https://github.com/Inserso/hello-hero.git/blob/master/app)

All first-party application source code lives here, including HTML, scripts, and styles of whatever flavor.

#### [/app/index.html](https://github.com/Inserso/hello-hero.git/blob/master/app/index.html)

The single page app "shell page". All sources are automatically wired in with gulp-inject.

#### [/app/app.js](https://github.com/Inserso/hello-hero.git/blob/master/app/app.js)

The app's main angular module is defined here. This file is always loaded first with gulp-angular-filesort.

#### [/app/components](https://github.com/Inserso/hello-hero.git/blob/master/app/components)

Each sub-directory here typically contains a directive and a matching html partial.

#### [/app/styles](https://github.com/Inserso/hello-hero.git/blob/master/app/styles)

Custom app styles (SASS) live here. There's also a foundation settings file.

#### [/server/server.js](https://github.com/Inserso/hello-hero.git/blob/master/server.js)

This is the entrypoint for the ExpressJS development server. It respects the environment variable `NODE_ENV`, taking its value as the directory out of which to serve static resources. It defaults to `dist.dev` to serve development files, and also accepts `dist.prod` to serve the production files.

#### [/server](https://github.com/Inserso/hello-hero.git/blob/master/devServer)

Scripts for backend & server.

#### [/tests](https://github.com/Inserso/hello-hero.git/blob/master/tests)

Application tests.

### Processed Sources

The gulp tasks listed below deal with taking sources from /app and "compiling" them for either development or production. `*-dev` tasks will output to /dist.dev, and `*-prod` will output to /dist.prod. Here's an overview of the directory structures for each:

### /dist.dev

Sources built for development. Styles are compiled to CSS. Everything else from /app is validated and moved directly in here. Nothing is concatenated, uglified, or minified. Vendor scripts are moved in as well.

    /dist.dev
    |
    |---- /bower_components
    |
    |---- /components
    |     |
    |     ...
    |
    |---- /styles
    |     |
    |     ...
    |
    |---- app.js
    |
    |---- index.html

### /dist.prod

PRODUCTION BUILD: syntax checked, things are concatenated and uglified, HTML partials are pre-loaded into the angular template cache with gulp-ng-html2js.

    /dist.prod
    |
    |---- /scripts
    |     |
    |     |---- app.min.js
    |     |---- vendor.min.js
    |
    |---- /styles
    |     |
    |     |---- app.min.css
    |
    |---- index.html
    
## Gulp Tasks

All of the following are available from the command line.

### Primary Tasks

- __`gulp watch-dev`__ Clean, build, and watch live changes to the dev environment. Built sources are served from /dist.dev.
- __`gulp watch-prod`__ Clean, build, and watch live changes to the prod environment. Built sources are served from /dist.prod.
- __`gulp`__ Default task builds for prod. Built sources are put into /dist.prod and served directly.

### Sub-tasks

__HTML__

- __`gulp validate-partials`__ Checks html source files for syntax errors.
- __`gulp validate-index`__ Checks index.html for syntax errors.
- __`gulp build-partials-dev`__ Moves html source files into the dev environment.

__Scripts__

- __`gulp convert-partials-to-js`__ Converts partials to javascript using html2js.
- __`gulp validate-devserver-scripts`__ Runs jshint on the dev server scripts.
- __`gulp validate-app-scripts`__ Runs jshint on the app scripts.
- __`gulp build-app-scripts-dev`__ Moves app scripts into the dev environment.
- __`gulp build-app-scripts-prod`__ Concatenates, uglifies, and moves app scripts and partials into the prod environment.

__Styles__

- __`gulp build-styles-dev`__ Compiles app sass and moves to the dev environment.
- __`gulp build-styles-prod`__ Compiles and minifies app sass to css and moves to the prod environment.
- __`gulp build-vendor-scripts-dev`__ Moves vendor scripts into the dev environment.
- __`gulp build-vendor-scripts-prod`__ Concatenates, uglifies, and moves vendor scripts into the prod environment.

__Index__
- __`gulp build-index-dev`__ Validates and injects sources into index.html and moves it to the dev environment.
- __`gulp build-index-prod`__ Validates and injects sources into index.html, minifies and moves it to the dev environment.

__Everything__

- __`gulp build-app-dev`__ Builds a complete dev environment.
- __`gulp build-app-prod`__ Builds a complete prod environment.
- __`gulp clean-build-app-dev`__ Cleans and builds a complete dev environment.
- __`gulp clean-build-app-prod`__ Cleans and builds a complete prod environment.
