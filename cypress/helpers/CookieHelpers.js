export function checkCookieValue(name, expectedValue) {
    cy.getCookie(name).should('have.property', 'value', expectedValue);
}

export function setCookieValue(name, value) {
    cy.setCookie(name, value);
}
