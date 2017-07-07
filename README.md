# (M)EAN Stack with Angular 2+ Starter

### Current version: 0.0.1

This is a starting point for (M)EAN stack applications (with Angular 2+ and `http/2`). MongoDB drivers are not setup as part of this boilerplate, but can easily be added (with `mongoose` or some other package). The idea is to have a setup to get you up and running quickly and to be database agnostic. You can easily add a database driver that fits your needs.

## TL;DR

You need:

1. [NodeJS](https://nodejs.org/) v6.9.0+
2. [Angular CLI](https://cli.angular.io) v1.0.0+

Run the app:

1. Generate certs and place them inside `/server/certs`. Generate certs by running this in your terminal `openssl req -x509 -newkey rsa:4096 -keyout ng2-development.key -out ng2-development.pem -days 365`. If the folder `certs` doesn't exist, create it.
2. Run `npm install`
3. Run `npm run build`
4. Start the server with*:

    ```bash
    NODE_ENV="development" SECRET="supersecret" CERTPHRASE="your.cert.password" node server.js
    ```
    
    *If you didn't setup a certificate password, you can omit `CERTPHRASE`.
    
5. Navigate to `https://localhost:8080`


## Not TL;DR

## Table of Contents
1. [What it has](#what-it-has)
2. [Setup](#setup)
    1. [Prerequisites](#prerequisites)
    2. [Prod and Dev](#prod-and-dev)
3. [Development Server](#development-server)
    1. [Node Server](#node-server)
    2. [Lite Server](#lite-server)
4. [Code Scaffolding](#code-scaffolding)
5. [Application Documentation](#application-documentation)
6. [API Documentation](#api-documentation)
7. [Build](#build)
8. [Running Unit Tests](#running-unit-tests)
9. [Running end-to-end Tests](#running-end-to-end-tests)
9. [Linting](#linting)
10. [Notes](#notes)
11. [Further help](#further-help)

<a name="what-it-has"></a>
## What it has
- Angular
- NodeJS (+ExpressJS)
- JWT-based authentication (naive, but can be modified and scaled to fit your needs)
- API Docs (thru [Swagger UI](http://swagger.io/swagger-ui/))
- App Docs (thru [TypeDoc](http://typedoc.org))
- git `pre-commit` and `pre-push` hooks (for more info see `Notes` below)

<a name="setup"></a>
## Setup

<a name="prerequisites"></a>
#### Prerequisites

- NodeJS is required (v >= **6.9.0**). It can be downloaded and installed from [here](https://nodejs.org/).

- Angular CLI is required (v >= **1.0.0**). It can be downloaded and installed by running `npm install -g @angular/cli`.
Note: The `-g` flag will install it globally and requires admin (`sudo`) rights for the current user.

- Nodemon is optional. It is used to automatically restart/reload the server on changes to the backend. It can be downloaded and installed by running `npm install -g nodemon`. Then, you can just run the server by going to the application folder and typing `nodemon server.js`.
Note: The `-g` flag will install it globally and requires admin (`sudo`) rights for the current user.

<a name="prod-and-dev"></a>
#### Prod and Dev

- if you are using Ubuntu or RedHat, you need to install the `build-essential`s
- clone the application (you need `git` installed to do it)
- install all dependencies, including the development ones, by running `npm install` from the application folder

<a name="development-server"></a>
## Development server

<a name="node-server"></a>
#### Node server

To run the application with the node server during local development and build/consume APIs and the app/UI do the following:

- generate certificates and place them in the `certs` folder (`app-root-folder/server/certs`) for local development. Please note that the certificate name should match the application name and the current environment (e.g. `app-name-development`, `app-name-production`, etc.). If you don't know how to generate `.pem` and `.key` files, you can search the internet or [read this post](http://blog.mgechev.com/2014/02/19/create-https-tls-ssl-application-with-express-nodejs/) or run this in your terminal `openssl req -x509 -newkey rsa:4096 -keyout app-name-development.key -out app-name-development.pem -days 365` (please use 2048 encryption and above when generating the certs, e.g. `rsa:2048`). If you setup a password for your certs, you will need to provide it when you start the server with the environmental variable `CERTPHRASE`
- if you use the default port configuration, the url will be `https://localhost:8080`. if you are using a different port (by setting the environmental variable `PORT` when you start the server), update the URL accordingly. Note that `http` won't open anything, **ONLY** `https` is allowed!
- if you want to enable `debug` mode to see more verbose output in the console, please set `APP_DEBUG="true"` when you start the server
- when you start the server, your final startup command should look something like this:

    ```bash
    NODE_ENV="development" CERTPHRASE="myphrase" SECRET="somesecret" APP_DEBUG="true" node server.js
    ```
    
    or if using `nodemon`
    
    ```bash
    NODE_ENV="development" CERTPHRASE="myphrase" SECRET="somesecret" nodemon server.js
    ```
    
    Available environmental variables:
    - PORT - `integer` - the port the node server will be listening on (default: `8080`)
    - NODE_ENV - `string` - the server environment (default: `development`)
    - CERTPHRASE - `string` - the certificate password if there is one (default: `undefined`)
    - SECRET - `string` - the secret to encode/decode the generated token (default: `undefined`)
    - APP_DEBUG - `"true"` (`string`) - prints verbose output in the console (default: `false`)
    - MAX_REQUESTS - `integer` - how many requests are allowed per window from a single IP address before it is blocked (default: `300` requests)
    - WINDOW_MINUTES - `integer` - how many minutes should the requests window be (default: `30` minutes)
    - TRUST_PROXY - `"true"` (`string`) - set to `true` if the server will be running behind a load balancer or reverse proxy (important for the rate limiter, default: `false`)
    - ALLOW_CORS - `"true"` (`string`) - set to `true` if you want to allow `Cross Origin` requests to the server (default: `false`)

**Note 1**: You need to build the application before trying to open it in a browser. To do so you can run `npm run build`. 

**Note 2**: The sever has a rate limiter. The default is 300 requests per 30 minutes. You can control these settings by setting the environmental variables `MAX_REQUESTS` (integer - e.g. `100` for 100 requests per window) and/or `WINDOW_MINUTES` (integer - e.g. `5` for 5 minutes windows) when you start your sever.

<a name="lite-server"></a>
#### Lite server

If you want, you can run the client side separately from node with `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the client side source files. To run the app with a secure connection (`https`) please use the `--ssl` flag - `ng server --ssl` - and change the protocol to `https` - `https://localhost:4200/`. It is **recommended** to run it with the secure flag to be closer to the prod env, which uses the secure protocol.

**Note**: If you want to listen for client side changes and auto build the client side and still use the node URL, you can use `npm run build:watch`, but this won't auto refresh the browser.

<a name="code-scaffolding"></a>
## Code Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

<a name="application-documentation"></a>
## Application Documentation

Run `npm run docs:app` to generate the documentation. Start the server and navigate to `http://localhost:port/documentation/app`.

The application documentation is generated using [TypeDoc](http://typedoc.org).

<a name="api-documentation"></a>
## API Documentation

Run `npm run docs:api` to generate the documentation. Start the server and navigate to `http://localhost:port/documentation/api`. Run `npm run docs:api:watch` to watch and automatically generate the documentation on changes. The swagger definitions can be set in the `swagger.def.js` file located under the `server` folder.

The API documentation is generated with [Swagger](http://swagger.io) (through `swagger-jsdoc`) and visualized with [Swagger UI](http://swagger.io/swagger-ui/).

**Note**: If you are using the `lite server` to view the documentation, the 'Try it out!' button will return errors (`404`s). If you want to use the button, it is recommended to view the docs using the node server URL.

<a name="build"></a>
## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use `npm run build:prod` for a production build.

<a name="running-unit-tests"></a>
## Running Unit Tests

Run `npm run test:ng` to execute the client side unit tests via [Karma](https://karma-runner.github.io).

Run `npm run test:node` to execute server side unit tests via [Jasmine](https://jasmine.github.io).

Use `npm test` to run all unit tests at once.

<a name="running-end-to-end-tests"></a>
## Running end-to-end Tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

<a name="linting"></a>
## Linting

Run `npm run lint` to lint your code. It will scan the CSS (`LESS`), the TypeScript (client side) and the JavaScript (server side) files.

<a name="notes"></a>
## Notes

 - The project is setup with Angular 4.2.x.
 - There is one example of using reusable animation with Angular's `animation()` and `useAnimation()` new methods to do fade in effect on route change (only on the first three routes). Most projects have some sort of animation. However, if you plan on not using Angular animations, please remove `@angular/animations` from package.json, `BrowserAnimationsModule` from `app.module.ts`, `NoopAnimationsModule` from any unit test that `imports` it and delete `/src/app/shared/animations`. 
 - This project is pre-configured to work with `LESS`, because it is easier to setup and requires less dependencies than `SASS`. But if you prefer to use `SASS` or something else, please update the project accordingly to fit your needs.
 - The project has a `pre-commit` hook to perform certain tasks before the code is committed. The base setup only runs the production build and the e2e tests. Feel free to modify it to fit your needs or remove it completely.
 - The project has a `pre-push` hook to perform certain tasks before the code is pushed. The base setup only runs the production build and the e2e tests. Feel free to modify it to fit your needs or remove it completely. (The idea is that during merging or rebasing mistakes might happen and end up in the repo, because merging and rebasing skip `commit` and directly `push`)
 - The project is setup with `@types/jasmine` v2.5.46+, which is a bit more strict, because `any` was replaced with an expected type (`Expected<T>`). If you are encountering problems, please downgrade to v2.4.45 ([more info](https://github.com/angular/angularfire2/issues/875))
 - There are no CSS libraries (e.g. Boostrap, Material, etc.) to give freedom to add any external styling library based on project needs.

<a name="further-help"></a>
## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

To get more help on the `swagger-jsdoc` use `./node_modules/swagger-jsdoc/bin/swagger-jsdoc.js -h` or go check out the [swagger-jsdoc README](https://github.com/Surnet/swagger-jsdoc/blob/master/README.md).
