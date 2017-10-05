# TestExamMaker

## Introduction
This is a case study project for a series of articles I'm writing about developing webapps based on Redux. It is not finished yet, nor the articles. It is based on my recent blog article "[Web app architecture based on Redux](http://devblog.ztp.pt/web-app-architecture-based-on-redux/)" (also on [Medium]().)

## Project Subject
The project is a webapp for making online exams or quizzes:
- Read the exam data from a server
- Allow single and multi-option answers, no open/text answers
- Time the examination using a server side timer
- Allow the user to finish the exam earlier
- At the end, evaluate the answers at the end

## Solution
The project uses the following technologies:
- Angular 4
- AngularCLI, AoT and Lazyloading
- RxJS
- @ngrx/store (Redux implementation)
- @ngrx/effects (side effects) for main business logic
- bootstrap 4 for web design and components
- jasmine unit tests
- protractor end-to-end tests

Also uses my two small packages:
- [router-store-ser](https://github.com/akaztp/router-store-ser)
- [match-observables](https://github.com/akaztp/match-observable)

## RoadMap
- Business models. Done.
- Plan redux state. Done.
- Plan redux actions and reducers. Done.
- Plan redux effects. Done.
- Init Angular CLI app. Done.
- Exam Angular module, routing, lazy loading. Done.
- Redux state. Done.
- Redux actions. Done.
- Redux reducers. Done.
- Redux effects and data services. Done.
- Containers, components, styling. In progress.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
