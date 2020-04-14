# Musicthon

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.24.

## Project Description
Musicthon - is a Progressive Web App(PWA), which primarily aims at providing offline feature to users, so that they never ever feel detach with their passion/interest - Music. For providing offline feature, it makes use of service-worker. Service-worker stores the response of the api calls made when the device was connected to the internet so that it can deliver its services later on when the internet is not available. In the situation where the user is not able to load the website on online mode for the 1st time, the user will still be able to use this app provided the user has downloaded his/her songs of interest before when the device was connected to the network. With download feature, there is a risk of data getting pirated but with Musicthon the data remains protected - reducing the risk of piracy and it does by encrypting the data while downloading. The downloaded encrypted data can only be played on the Musicthon Web App as only this app knows how to decrypt the data. On opening the 'Downloads' Folder on the Musicthon app, the app searches the downloaded files and decrypts the data, which on clicking starts to play. This way Musicthon allows users to continue their learning/enjoying music even in offline mode.       

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

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
