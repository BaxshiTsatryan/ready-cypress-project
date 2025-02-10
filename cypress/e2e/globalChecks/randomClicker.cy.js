import {urlsForGlobalChecks} from '../../constants/Urls';
import {page404Selector} from '../../fixtures/pages/page404';

describe('Random Clicker', () => {
    const CLICKS_COUNT = 10;
    const WAIT_BETWEEN_CLICKS = 3000;
    const SELECTOR = 'a:not([target="_blank"]):not([href*="mailto:"]):not([href*="tel:"]),button:not([disabled]):not([aria-disabled="true"]),input[type="button"]:not([disabled]),input[type="submit"]:not([disabled]),[role="button"]:not([disabled]):not([aria-disabled="true"])';
    const entryUrl = urlsForGlobalChecks[Math.floor(Math.random() * urlsForGlobalChecks.length)];
    const startFromRandomUrl = true;

    const getClickableElements = () => cy.get(SELECTOR).filter(':visible');

    const performRandomClick = ($elements) => {
        if ($elements.length === 0) return;

        const randomIndex = Math.floor(Math.random() * $elements.length);
        const $element = $elements[randomIndex];

        cy.log(`Clicking element: ${$element.tagName} with text: ${$element.textContent}`);

        cy.wrap($element)
            .scrollIntoView()
            .click({ force: true })
            .wait(WAIT_BETWEEN_CLICKS);
    };

    const check404Error = () => {
        cy.shouldNotExist(page404Selector);
        cy.contains('not found').should('not.exist');
    };

    beforeEach(() => {
        if(startFromRandomUrl) {
            cy.visit(entryUrl);
        } else {
            cy.visit('#');
        }

        cy.window().then(win => {
            return new Cypress.Promise(resolve => {
                if (win.document.readyState === 'complete') {
                    resolve();
                } else {
                    win.addEventListener('load', resolve);
                }
            });
        });
    });

    it(`Should randomly click ${CLICKS_COUNT} clickable elements`, () => {
        const visitedUrls = [];

        for (let i = 0; i < CLICKS_COUNT; i++) {
            cy.log(`Click attempt ${i + 1} of ${CLICKS_COUNT}`);

            getClickableElements().then($elements => {
                performRandomClick($elements);
            });

            check404Error();

            cy.url().then(url => {
                if (!visitedUrls.includes(url)) {
                    visitedUrls.push(url);
                }
            });

            cy.on('window:confirm', () => true);
            cy.on('window:alert', () => true);
        }

        cy.then(() => {
            cy.log('Visited URLs during test:');
            visitedUrls.forEach(url => cy.log(url));
        });
    });
});