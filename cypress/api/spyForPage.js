// Just example
// For waiting all responses

const request1 = 'https://api.example.com/v2/products';
const request2 = 'https://api.example.com/v2/waitlists';
const request3 = 'https://api.example.com/v2/users';

export function spyRequest(requestUrl, alias) {
    cy.intercept(requestUrl).as(alias);
}

export function spyMainPageAllRequests(url) {
    spyRequest(request1, 'productsList');
    cy.visit(url);
    cy.wait('@productsList');
}

export function spyUserPageAllRequests(url) {
    spyRequest(request1, 'productsList');
    spyRequest(request2, 'waitlists');
    spyRequest(request3, 'users');

    cy.visit(url);

    cy.wait('@productsList');
    cy.wait('@waitlists');
    cy.wait('@users');
}
