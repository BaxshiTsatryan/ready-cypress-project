export function setUserToken(token) {
    cy.setCookie('userData', token);
}

export function checkCookieValue(name, expectedValue) {
    cy.getCookie(name).should('have.property', 'value', expectedValue);
}
