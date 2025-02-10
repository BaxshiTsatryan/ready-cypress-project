import {urlsForGlobalChecks} from '../../constants/Urls';

describe('Broken links scanner', () => {
    const checkedLinks = new Set();

    urlsForGlobalChecks.forEach((page) => {
        it(`Check broken links for ${page} page`, () => {
            cy.visit(page);
            cy.get('a[href]').each(($link) => {
                const href = $link.prop('href');
                if (href && !checkedLinks.has(href)) {
                    checkedLinks.add(href);
                    cy.request({
                        url: href,
                        failOnStatusCode: false,
                    }).then((response) => {
                        expect(response.status).to.be.oneOf([200, 301, 302]);
                    });
                }
            });
        });
    });
});