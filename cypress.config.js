const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
     baseUrl: "https://example.cypress.io",
     retries: {
      runMode: 1,
      openMode: 1,
    },
    defaultCommandTimeout: 10000,
    video: true,
    screenshotOnRunFailure: true,
    pageLoadTimeout: 20000,
  },
});
