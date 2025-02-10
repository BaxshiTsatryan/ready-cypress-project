import {urlsForGlobalChecks} from '../../constants/Urls';

describe('Page Size Test', () => {
    const MAX_PAGE_SIZE = 2 * 1024 * 1024; // 2MB

    urlsForGlobalChecks.forEach((page) => {
        it(`Should check the page size of ${page}`, () => {
            cy.request({
                url: page,
                encoding: 'binary'
            }).then((response) => {
                const pageSize = response.body.length;
                expect(pageSize).to.be.lessThan(MAX_PAGE_SIZE);
            });
        });
    });
});