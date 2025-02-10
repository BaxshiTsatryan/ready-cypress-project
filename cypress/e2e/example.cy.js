import {exampleFunction} from "../fixtures/pages/example";

describe('Example Describe', () => {
    before(() => {
        cy.visit('#');
    });

    it('Example It', () => {
        exampleFunction();
    });
});