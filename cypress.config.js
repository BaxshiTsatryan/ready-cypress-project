const { defineConfig } = require('cypress');

// eslint-disable-next-line no-undef
module.exports = defineConfig({
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 4000,
    supportFile: 'cypress/support/commands.js',
    watchForFileChanges: false,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    screenshotOnRunFailure: false,
    video: false,
  },
});