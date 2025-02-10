import {urlsFor404HunterClient} from '../../constants/Urls';
import {page404Selector} from '../../fixtures/pages/page404';

describe('Check all pages 404 with Client', () => {
    urlsFor404HunterClient.forEach(({entryUrl, selector, url}) => {
        it(`Check ${url} after navigate from ${entryUrl}`, () => {
            cy.visit(entryUrl);
            cy.get(selector).click();
            cy.wait(2000);
            cy.url({timeout: 10000}).should('include', url);

            cy.shouldNotExist(page404Selector());
            cy.contains('not found').should('not.exist');
        });
    });
});