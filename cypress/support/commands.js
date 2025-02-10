// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('checkText', (selector, expectedText) => {
    cy.get(selector, { timeout: 6000 }).should('have.text', expectedText);
});

Cypress.Commands.add('checkTextInclude', (selector, expectedText) => {
    cy.get(selector, { timeout: 6000 }).should('include.text', expectedText);
});

Cypress.Commands.add('urlShouldInclude', text => {
    cy.url().should('include', text);
});

Cypress.Commands.add('clickIfExistElseCallback', (selector, callback) => {
    cy.document().then(doc => {
        if (doc.querySelector(selector)) {
            doc.querySelector(selector).click();
        } else {
            if (callback != null) callback();
        }
    });
});

Cypress.Commands.add('clickIfExist', selector => {
    cy.document().then(doc => {
        if (doc.querySelector(selector)) {
            doc.querySelector(selector).click();
        }
    });
});

Cypress.Commands.add('checkUrl', page => {
    cy.url({ timeout: 15000 }).should('eq', page);
});

Cypress.Commands.add('urlIsNot', url => {
    cy.url().should('not.eql', url);
});

Cypress.Commands.add('checkHref', (element, url) => {
    cy.get(element).should('have.attr', 'href', url);
});

Cypress.Commands.add('isVisible', element => {
    cy.get(element).should('be.visible');
});

Cypress.Commands.add('shouldExist', selector => {
    cy.get(selector).should('exist');
});

Cypress.Commands.add('shouldNotExist', selector => {
    cy.get(selector).should('not.exist');
});

Cypress.Commands.add('isEnabled', element => {
    cy.get(element).should('not.be.disabled');
});

Cypress.Commands.add('isDisabled', element => {
    cy.get(element).should('be.disabled');
});

Cypress.Commands.add('setLocalStorage', ({ keyName, value }) => {
    localStorage.setItem(keyName, JSON.stringify(value));
});

// Design

Cypress.Commands.add('themeIsDark', () => {
    cy.get('html').should('have.class', 'dark-mode');
});

Cypress.Commands.add('themeIsLight', () => {
    cy.get('html').should('have.class', 'light-mode');
});

Cypress.Commands.add('checkFontFamilyRobotoSansSerif', selector => {
    cy.get(selector).should('have.css', 'font-family', 'Roboto, sans-serif');
});

Cypress.Commands.add('checkFontFamily', (selector, font) => {
    cy.get(selector).should('have.css', 'font-family', font);
});

Cypress.Commands.add('checkFontSizeAndLineHeight', (selector, fontSize, lineHeight) => {
    cy.get(selector).should('have.css', 'font-size', fontSize);
    cy.get(selector).should('have.css', 'line-height', lineHeight);
});

Cypress.Commands.add('checkFontWeight', (selector, fontWeight) => {
    cy.get(selector).should('have.css', 'font-weight', fontWeight);
});

Cypress.Commands.add('checkWidthAndHeight', (selector, width, height) => {
    cy.get(selector).should('have.attr', 'width', width);
    cy.get(selector).should('have.attr', 'height', height);
});

Cypress.Commands.add('checkColor', (selector, color) => {
    cy.get(selector).should('have.css', 'color', color);
});

Cypress.Commands.add('checkBackgroundColor', (selector, color) => {
    cy.get(selector).should('have.css', 'background-color', color);
});

Cypress.Commands.add('checkBorderColor', (selector, color, size) => {
    cy.get(selector).should('have.css', 'border', `${size}px solid ${color}`);
});

Cypress.Commands.add('checkBorderRadius', (selector, radius) => {
    cy.get(selector).should('have.css', 'border-radius', radius);
});

Cypress.Commands.add('forceClick', selector => {
    cy.get(selector).click({ force: true });
});