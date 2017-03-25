# (M)EAN Stack with Angular 2+ Starter

### Current version: 0.0.2

This is a starting point for (M)EAN stack applications (with Angular 2+ and `http/2`). MongoDB drivers are not setup as part of this boilerplate, but can easily be added (with `mongoose` or some other package). The idea is to have a setup to get you up and running quickly and to be database agnostic. You can easily add a database driver that fits your needs. It also uses [Swagger](http://swagger.io) (through `swagger-jsdoc`) to generate the API documentation and visualize it with [Swagger UI](http://swagger.io/swagger-ui/).

## Setup

#### Prerequisites

- NodeJS is required (v >= **6.9.0**). It can be downloaded and installed from [here](https://nodejs.org/).

- Angular CLI is required (v >= **1.0.0**). It can be downloaded and installed by running `npm install -g @angular/cli`.
Note: The `-g` flag will install it globally and requires admin (`sudo`) rights for the current user.

- Nodemon is optional. It is used to automatically restart/reload the server on changes to the backend. It can be downloaded and installed by running `npm install -g nodemon`. Then, you can just run the server by going to the application folder and typing `nodemon server.js`.
Note: The `-g` flag will install it globally and requires admin (`sudo`) rights for the current user.

#### Prod and Dev

- you need the `build-essential`s installed on Ubuntu and RedHat
- clone the application (you need `git` installed to do it)
- install all dependencies, including the development ones, by running `npm install` from the application folder

## Development server

#### Node server

To run the application with the node server during local development and build/consume APIs do the following:

- generate certificates and place them in the `certs` folder (`app-root-folder/server/certs`) for local development. Please note that the certificate name should match the application name and the current environment (e.g. `app-name-development`, `app-name-production`, etc.). If you don't know how to generate `.pem` and `.key` files, you can search the internet or [read this post](http://blog.mgechev.com/2014/02/19/create-https-tls-ssl-application-with-express-nodejs/) or run this in your terminal `openssl req -x509 -newkey rsa:4096 -keyout app-name-development.key -out app-name-development.pem -days 365` (please use 2048 encryption and above when generating the certs, e.g. `rsa:2048`). If you setup a password for your certs, you will need to provide it when you start the server with the environmental variable `CERTPHRASE`
- if you use the default port configuration, the url will be `https://localhost:8080`. if you are using a different port (by setting the environmental variable `PORT` when you start the server), update the URL accordingly. Note that `http` won't open anything, **ONLY** `https` is allowed!
- if you want to enable `debug` mode to see more verbose output in the console, please set `APP_DEBUG="true"` when you start the server
- when you start the server, your final startup command should look something like this:

    ```bash
    CERTPHRASE="myphrase" APP_DEBUG="true" node server.js
    ```
    
    or if using `nodemon`
    
    ```bash
    CERTPHRASE="myphrase" nodemon server.js
    ```
    
    Available environmental variables:
    - PORT - `integer` - the port the node server will be listening on (default: `8080`)
    - ENV - `string` - the server environment (default: `development`)
    - CERTPHRASE - `string` - the certificate password if there is one (default: `undefined`)
    - APP_DEBUG - `"true"` (`string`) - prints verbose output in the console (default: `false`)
    - MAX_REQUESTS - `integer` - how many requests are allowed per window from a single IP address before it is blocked (default: `300` requests)
    - WINDOW_MINUTES - `integer` - how many minutes should the requests window be (default: `30` minutes)
    - TRUST_PROXY - `"true"` (`string`) - set to `true` if the server will be running behind a load balancer or reverse proxy (important for the rate limiter, default: `false`)
    - ALLOW_CORS - `"true"` (`string`) - set to `true` if you want to allow `Cross Origin` requests to the server (default: `false`)

**Note 1**: You need to build the application before trying to open it in a browser. To do so you can run `npm run build`. 

**Note 2**: The sever has a rate limiter. The default is 300 requests per 30 minutes. You can control these settings by setting the environmental variables `MAX_REQUESTS` (integer - e.g. `100` for 100 requests per window) and/or `WINDOW_MINUTES` (integer - e.g. `5` for 5 minutes windows) when you start your sever.

#### Lite server

If you want, you can run the client side separately from node with `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the client side source files. To run the app with a secure connection (`https`) please use the `--ssl` flag - `ng server --ssl` - and change the protocol to `https` - `https://localhost:4200/`. It is **recommended** to run it with the secure flag to be closer to the prod env, which uses the secure protocol.

**Note**: If you want to listen for client side changes and auto build the client side and still use the node URL, you can use `npm run build:watch`, but this won't auto refresh the browser.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## API Documentation

Run `npm run apidocs` to generate the documentation. Start the server and navigate to `http://localhost:port/documentation/api`. Run `npm run apidocs:watch` to watch and automatically generate the documentation. The swagger definitions can be set in the `swagger.def.js` file located under the `server` folder.

**Note**: If you are using the `lite server` to view the documentation, the 'Try it out!' button will return errors (`404`s). If you want to use the button, it is recommended to view the docs using the node server URL.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use `npm run build:prod` for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve` (or `npm start`).

## Linting

Run `npm run lint` to lint your code. It will scan the CSS (`LESS`), TypeScript, JavaScript (server side) and HTML files.

## Notes

 - The project is setup with Angular 4.
 - This project is pre-configured to work with `LESS`, because it is easier to setup and requires less dependencies than `SASS`. But if you prefer to use `SASS` or something else, please update the project accordingly to fit your needs.
 - The project has a `pre-commit` hook to perform certain tasks before the code is committed. The base setup only runs the linting and the tests. Feel free to modify it to fit your needs or remove it completely.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

To get more help on the `swagger-jsdoc` use `./node_modules/swagger-jsdoc/bin/swagger-jsdoc.js -h` or go check out the [swagger-jsdoc README](https://github.com/Surnet/swagger-jsdoc/blob/master/README.md).
