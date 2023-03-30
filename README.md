The project was created to automate the front end of a web project. The project is built in the JavaScript programming language and Cypress testing framework. Chai JS, Sinon, Axios are also used. For run large projects in Cypress need at least 4GB RAM.

## What we need:

1. IDE - e.g. WebStorm / Visual Studio Code,
2. Cypress.

## How to Install IDE, Cypress and Project:

1. Download your favorite IDE (example for WebStorm)
2. Navigate to https://www.jetbrains.com/ru-ru/webstorm/ and download the WebStorm
3. Open WebStorm and clone project from GitHub
4. When paste the link from Github for clone the project - should be also /cypress for correct cloning the project
5. After cloning the project - in terminal type:  `npm init` npm i (or npm install)
6. From webstorm terminal go to previous folder than your project in that folder install cypress:
    `npm install cypress --save-dev`
7. You can see details of Cypress installing - https://docs.cypress.io/guides/getting-started/installing-cypress#Opening-Cypress
8. `npm init ` and
   `npm i (or npm install)`
9. Pull and Fetch the project: `git pull origin main` and  `git fetch`

## How to open and run Cypress:

1. You can open Cypress by command  `npx cypress open`
2. Or You can use Cypress GUI app - open it, select project file manually
3. You can run all projects by command `npx cypress run`
4. Or You can use Cypress GUI app - open it, select project file manually and click on any test for run it

## How to write tests:

All functions/variables/constants are exported separately. This makes the tests faster, because the entire class is not exported, but only what is needed.

If we will test pages, we need to create a file in the fixtures/pages folder, if it is a component and is used in many pages, then we create a file in the fixtures/pages folder.
First, we write all the selectors, if the selector is needed outside the file, then we need to export it. We write all the functions that will be needed for the tests and also export them.

If there is a lot of complex code, then you can throw them in the cases folder. And only then we create a test file in the e2e folder and write the test.


### api:

In the API file, we write all the stubs and request interceptors. A separate file is created for each page/functional and all functions are written there. Here is an example:

``export function productsListRequest(alias) {
    cy.intercept(METHODS.GET, `${API_URL}productsList`).as(alias);
}``

In this example, we have created a function that takes an alias parameter, which can be any name. And when we call this function, we just have to wait for this request and catch it.

### constants:

#### Api:
Here there is an object with all popular types of requests. You can also record all query links here.

#### Colors:
The Colors folder records all the colors on the site so that you can test the design. If the design is not being tested on your project, you can delete this file.

The color is always constant and is written in rgb format, for convenience, you can also write next to it in the comment in HEX format. Here is an example:

`export const WhiteColor = 'rgb(255, 255, 255)'; // #FFFFFF`

#### Cookies:
If your project has a captcha in the authorization system, then sometimes it is more convenient to log in using cookies.

`export const EXAMPLE_COOKIE = 'eyJzZXDzaW9uVG9rZW4iOiJyOjNjYTNjODlmNGFkNGZhMjFiMTE4NGM0ZTZiOGNmNjBjIn0=';  // testAcc@gmail.com / qwe123`


#### Fonts:
The file contains all popular font sizes, you can test the fonts

#### Urls:

For navigate or check links there is file with all urls. Also in that file there is environments, cookies and methods for them.

``export const MAIN_URL = 'https://www.automationexercise.com/';
export const PRODUCTS_URL = `${MAIN_URL}products`;``

### e2e:
Tests are in e2e/tests page. All test should be in one describe and in it may be other describes. If we add some portfolio/transactions, we need to delete them after tests. Navigate/Setcookie methods should be in before anotation and delete data methods should be in after anotation. If we use some function many time we need to use anotations. Tests files names should be .cy.js format.

### fixtures:
Because the best project pattern is page object - all the pages should has file with all selectors and methods for them. If that components there are in many pages - we can write selectors/methods in components folder.

### helpers:
This folder contains everything you need for convenient testing and writing code.

#### ApiHelpers:
Helper functions for working with api. There is an example function - RequestHendler.

#### CookieHelpers:
Helpers for working with cookies. For example function for checking cookie:

`export function checkCookieValue(name, expectedValue) {
    cy.getCookie(name).should('have.property', 'value', expectedValue);
}`

#### Utils:
For some useful and frequently using functions should create general function. And in the future all functions should be cy commands.


## Developers:

Baxshi Tsatryan
