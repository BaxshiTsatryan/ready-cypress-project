const { defineConfig } = require('cypress');

// eslint-disable-next-line no-undef
module.exports = defineConfig({
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    requestTimeout: 60000,
    defaultCommandTimeout: 4000,
    supportFile: 'cypress/support/index.js',
    watchForFileChanges: false,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    screenshotOnRunFailure: false,
    video: false,
    setupNodeEvents(on, config) {
      require('cypress-terminal-report/src/installLogsPrinter')(on);
    },
  },
});