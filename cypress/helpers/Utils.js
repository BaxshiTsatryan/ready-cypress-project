// Check also commands.js

export function getText(selector) {
    return new Promise(resolve => {
        cy.get(selector)
            .invoke('text')
            .then(res => resolve(res));
    });
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

export function pageTotalSizeScanner() {
    cy.window().then(win => {
        const totalSize = win.performance.getEntriesByType('resource').reduce((acc, curr) => acc + curr.transferSize, 0);
        expect(totalSize).to.be.lessThan(1000000);
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
