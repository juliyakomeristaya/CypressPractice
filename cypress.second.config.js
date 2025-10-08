const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://guest:welcome2qauto@qauto2.forstudy.space",
    retries: {
      runMode: 1,
      openMode: 1,
    },
    env: {
      USER_EMAIL: "juliyakomeristaya2@gmail.com",
      USER_PASSWORD: "Test12345!",
    },
    defaultCommandTimeout: 10000,
    video: true,
    screenshotOnRunFailure: true,
    pageLoadTimeout: 20000,
  },
});
