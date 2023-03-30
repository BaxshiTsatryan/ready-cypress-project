// TODO move all these functions to Commands
export function checkText(selector, expectedText) {
    cy.get(selector, {timeout: 6000}).should('have.text', expectedText);
}

export function checkTextInclude(selector, expectedText) {
    cy.get(selector, {timeout: 6000}).should('include.text', expectedText);
}

export function urlShouldInclude(text) {
    cy.url().should('include', text);
}

export function getText(selector) {
    return new Promise(resolve => {
        cy.get(selector)
            .invoke('text')
            .then(res => resolve(res));
    });
}

export function clickIfExist(selector, callback) {
    cy.document().then(doc => {
        if (doc.querySelector(selector)) {
            doc.querySelector(selector).click();
        } else {
            if (callback != null) callback();
        }
    });
}

export function compareTexts(actualResult, expectedResult) {
    expect(actualResult).equal(expectedResult);
}

export function checkUrl(page) {
    cy.url({timeout: 6000}).should('eq', page);
}

export function urlIsNot(url) {
    cy.url().should('not.eql', url);
}

export function checkHref(element, url) {
    cy.get(element).should('have.attr', 'href', url);
}

export function isVisible(element) {
    cy.get(element).should('be.visible');
}

export function isNotVisible(element) {
    cy.get(element).should('not.be.visible');
}

export function shouldExist(selector) {
    cy.get(selector).should('exist');
}

export function shouldNotExist(selector) {
    cy.get(selector).should('not.exist');
}

export function isExisting(element) {
    return Cypress.$(element).length > 0;
}

export function isEnabled(element) {
    cy.get(element).should('not.be.disabled');
}

export function isDisabled(element) {
    cy.get(element).should('be.disabled');
}

export function setLocalStorage({keyName, value}) {
    localStorage.setItem(keyName, JSON.stringify(value));
}

export function randomNumber(from, to) {
    return Math.floor(Math.random() * (from - to + 1) + to);
}

// Scanners

export function checkBrokenLinks() {
    cy.get('a[href]').each(link => {
        let href = link.prop('href');
        cy.request(href).its('status').should('be.lessThan', 400);
    });
}

export function xssAttackTest(input) {
    cy.get(input).type('<script>alert("XSS")</script>');
    cy.get('body').should('not.contain', 'XSS');
}

export function isPageAvailable(url) {
    cy.request(url).then(response => {
        expect(response.status).to.be.lessThan(400);
    });
}

export function seoScannerBasic() {
    cy.title().should('not.be.empty');
    cy.get('meta[name="description"]').should('have.attr', 'content');
    cy.get('head meta[name="description"]').should('exist');
    cy.get('head meta[name="keywords"]').should('exist');
    cy.get('head meta[property="og:title"]').should('exist');
    cy.get('head meta[property="og:description"]').should('exist');
    cy.get('head meta[property="og:image"]').should('exist');
    cy.get('h1').should('exist');
    cy.get('img').each($el => {
        const alt = $el.attr('alt');
        expect(alt).to.not.be.empty;
    });
}

export function imgAltScanner() {
    cy.get('img').each($el => {
        const alt = $el.attr('alt');
        expect(alt).to.not.be.empty;
    });
}

export function checkPageSpeed() {
    cy.window().then(win => {
        const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;
        expect(loadTime).to.be.lessThan(3000);
    });

    cy.document().then(doc => {
        const pageSize = doc.documentElement.innerHTML.length;
        expect(pageSize).to.be.lessThan(500000);
    });
}

export function requestSecurityScanner(requestUrl) {
    cy.request(requestUrl).then(response => {
        expect(response.status).to.eq(200);

        expect(response.body).to.not.include('/admin');
        expect(response.body).to.not.include('/.env');
        expect(response.body).to.not.include('/.git');
        expect(response.body).to.not.include('/wp-admin');

        expect(response.body).to.not.include('Index of /');
        expect(response.body).to.not.include('<a href="../">../</a>');
    });
}

export function scraper() {
    cy.get('a').then($links => {
        for (let i = 0; i < $links.length; i++) {
            const title = $links[i].getAttribute('title');
            if (title) {
                cy.log(title);
            }
        }
    });
}

export function requestsCountLessThan10(url) {
    cy.intercept('GET', '**').as('getApi');
    cy.visit(url);
    cy.wait('@getApi')
        .its('response.body')
        .then(body => {
            expect(body).to.have.length.lessThan(10);
        });
}

export function pageTotalSizeScanner() {
    cy.window().then(win => {
        const totalSize = win.performance.getEntriesByType('resource').reduce((acc, curr) => acc + curr.transferSize, 0);
        expect(totalSize).to.be.lessThan(1000000);
    });
}

export function corsScanner(url) {
    const unauthorizedMethods = ['POST', 'PUT', 'DELETE'];

    unauthorizedMethods.forEach(method => {
        cy.request({
            method: method,
            url: url,
            failOnStatusCode: false,
        }).then(response => {
            if (response.status === 405) {
                cy.log(`CORS policy blocks unauthorized ${method} method`);
            } else if (response.status === 200) {
                cy.log(`CORS policy allows ${method} method`);
            } else {
                cy.log(`Cannot access ${url} with ${method} method`);
            }
        });
    });
}

export function clickJackingScanner() {
    cy.get('body').then(body => {
        if (body.find('iframe').length > 0) {
            cy.log('The website allows loading in an iframe, which may be a Clickjacking vulnerability');
            return false;
        } else {
            cy.log('The website does not allow loading in an iframe, which is good for security');
        }
    });
}

export function elementsExistenceScanner() {
    cy.get('*').each($el => {
        cy.wrap($el).should('exist');
    });
}

export function elementsVisibilityScanner() {
    cy.get('*').each($el => {
        cy.wrap($el).should('be.visible').should('not.be.covered');
    });
}

export function accessibilityScanner() {
    cy.injectAxe();
    cy.checkA11y();
}

export function wcag21StandardScanner() {
    cy.injectAxe();
    cy.checkA11y(null, {
        runOnly: {
            type: 'tag',
            values: ['wcag2aa'],
        },
    });
}

// Design

export function checkFontFamilyRobotoSansSerif(selector) {
    cy.get(selector).should('have.css', 'font-family', 'Roboto, sans-serif');
}

export function checkFontFamily(selector, font) {
    cy.get(selector).should('have.css', 'font-family', font);
}

export function checkFontSizeAndLineHeight(selector, fontSize, lineHeight) {
    cy.get(selector).should('have.css', 'font-size', fontSize);
    cy.get(selector).should('have.css', 'line-height', lineHeight);
}

export function checkFontWeight(selector, fontWeight) {
    cy.get(selector).should('have.css', 'font-weight', fontWeight);
}

export function checkWidthAndHeight(selector, width, height) {
    cy.get(selector).should('have.attr', 'width', width);
    cy.get(selector).should('have.attr', 'height', height);
}

export function checkColor(selector, color) {
    cy.get(selector).should('have.css', 'color', color);
}

export function checkBorderColor(selector, color, size) {
    cy.get(selector).should('have.css', 'border', `${size}px solid ${color}`);
}

export function checkBorderRadius(selector, radius) {
    cy.get(selector).should('have.css', 'border-radius', radius);
}

export function checkBackgroundColor(selector, color) {
    cy.get(selector).should('have.css', 'background-color', color);
}