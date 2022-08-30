# DtWebshop

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.25.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

# Install

## TypeDoc
$ npm install --save-dev del gulp@3.9.1 gulp-strip-code gulp-typescript gulp-util gulp-typedoc
$ npm install --save-dev prettier run-sequence child_process del

## local db server
$ npm i -g json-server
run json server:
$ sudo json-server ./server/db.json --watch

## Heroku deploy
$ npm i -s express path

## add material
$ ng add @angular/material
$ npm i -s @angular/cdk
$ npm i -s @angular/flex-layout@8.0.0-beta.27

## multiple languages
$ npm i @ngx-translate/core  @ngx-translate/http-loader --save
$ ng generate service services/languages

## shop
$ npm i -s redux@4.0.1
$ npm i -s redux-devtools-extension
$ npm i -s @ngrx/store @ngrx/effects
$ npm i -s @angular-redux/store
$ ng g component components/product --module app
$ ng generate service services/products
$ ng g component components/product-list --module app

## components
$ ng g component components/connection --module app
$ ng g component components/header --module app
$ ng g component components/sidenav-list --module app

## interface
$ ng g i models/product
$ ng g i models/async-response

## Openlayers
$ npm i -s openlayers @types/openlayers ol

## local storage
$ ng generate service services/local-storage

