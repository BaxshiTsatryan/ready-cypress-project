export function checkCookieValue(name, expectedValue) {
    cy.getCookie(name).should('have.property', 'value', expectedValue);
}
