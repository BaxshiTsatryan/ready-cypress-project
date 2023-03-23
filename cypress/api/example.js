import {API_URL, METHODS} from '../constants/Api';

export function productsListRequest(alias) {
    cy.intercept(METHODS.GET, `${API_URL}productsList`).as(alias);
}
