# Rumpel

This project was last tested with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.2.

## Suggested development environment setup

- NPM >=5.0 (required to make use of the **package-lock.json** file)
- Node >=8.1
- Angular CLI >=1.5
- Typescript >=2.4
- Angular >=5.0

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. 
To run the server with a customised domain name (such as `http://rumpel.hat.org:4200`), the name needs to be specified when
initialising `ng serve --host rumpel.hat.org`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. 

Use the `--target=production` and `--environment=standalone` flags for a standalone production build or
`--target=production` and `--environment=native` flags for a HAT native production build.

Also it might be necessary to update configuration parameters in the `/src/app/app.config.ts` file. Namely, `name`, 
`exchange` and `databuyer` parameters should be updated when the app is run outside of HAT testing environment.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## License

This work is licensed under the Mozilla Public License Version 2.0. Please read the [LICENSE](https://github.com/Hub-of-all-Things/Rumpel/blob/master/LICENSE.md) file for further details.
