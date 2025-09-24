const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://guest:welcome2qauto@qauto.forstudy.space",
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
