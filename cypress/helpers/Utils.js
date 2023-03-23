// TODO move all these functions to Commands
export function checkText(selector, expectedText) {
    cy.get(selector, {timeout: 6000}).should('have.text', expectedText);
}

export function checkTextInclude(selector, expectedText) {
    cy.get(selector, {timeout: 6000}).should('include.text', expectedText);
}

export function urlShouldInclude(text) {
    cy.url().should('include', text);
}

export function getText(selector) {
    return new Promise(resolve => {
        cy.get(selector)
            .invoke('text')
            .then(res => resolve(res));
    });
}

export function clickIfExist(selector, callback) {
    cy.document().then(doc => {
        if (doc.querySelector(selector)) {
            doc.querySelector(selector).click();
        } else {
            if (callback != null) callback();
        }
    });
}

export function compareTexts(actualResult, expectedResult) {
    expect(actualResult).equal(expectedResult);
}

export function checkUrl(page) {
    cy.url({timeout: 6000}).should('eq', page);
}

export function urlIsNot(url) {
    cy.url().should('not.eql', url);
}

export function checkHref(element, url) {
    cy.get(element).should('have.attr', 'href', url);
}

export function isVisible(element) {
    cy.get(element).should('be.visible');
}

export function isNotVisible(element) {
    cy.get(element).should('not.be.visible');
}

export function shouldExist(selector) {
    cy.get(selector).should('exist');
}

export function shouldNotExist(selector) {
    cy.get(selector).should('not.exist');
}

export function isExisting(element) {
    return Cypress.$(element).length > 0;
}

export function isEnabled(element) {
    cy.get(element).should('not.be.disabled');
}

export function isDisabled(element) {
    cy.get(element).should('be.disabled');
}

export function setLocalStorage({keyName, value}) {
    localStorage.setItem(keyName, JSON.stringify(value));
}

export function randomNumber(from, to) {
    return Math.floor(Math.random() * (from - to + 1) + to);
}

// Design

export function checkFontFamilyRobotoSansSerif(selector) {
    cy.get(selector).should('have.css', 'font-family', 'Roboto, sans-serif');
}

export function checkFontFamily(selector, font) {
    cy.get(selector).should('have.css', 'font-family', font);
}

export function checkFontSizeAndLineHeight(selector, fontSize, lineHeight) {
    cy.get(selector).should('have.css', 'font-size', fontSize);
    cy.get(selector).should('have.css', 'line-height', lineHeight);
}

export function checkFontWeight(selector, fontWeight) {
    cy.get(selector).should('have.css', 'font-weight', fontWeight);
}

export function checkWidthAndHeight(selector, width, height) {
    cy.get(selector).should('have.attr', 'width', width);
    cy.get(selector).should('have.attr', 'height', height);
}

export function checkColor(selector, color) {
    cy.get(selector).should('have.css', 'color', color);
}

export function checkBorderColor(selector, color, size) {
    cy.get(selector).should('have.css', 'border', `${size}px solid ${color}`);
}

export function checkBorderRadius(selector, radius) {
    cy.get(selector).should('have.css', 'border-radius', radius);
}

export function checkBackgroundColor(selector, color) {
    cy.get(selector).should('have.css', 'background-color', color);
}