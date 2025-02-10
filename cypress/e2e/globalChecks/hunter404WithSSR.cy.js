import {urlsForGlobalChecks} from '../../constants/Urls';
import {page404Selector} from '../../fixtures/pages/page404';

describe('Check all pages 404 with SSR', () => {
    urlsForGlobalChecks.forEach((page) => {
        it(`Check page ${page}`, () => {
            cy.request({
                url: page,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.not.eq(404);
                expect(response.status).to.be.oneOf([200, 301, 302]);
            });

            cy.visit(page);
            cy.shouldNotExist(page404Selector());
            cy.contains('not found').should('not.exist');
        });
    });
});