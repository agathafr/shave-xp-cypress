const { defineConfig } = require("cypress");

const { removeUser } = require('./cypress/support/tasks/database')

require("dotenv/config");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return Object.assign({}, config, {
        env: {
          app_api_url: process.env.APP_API_URL,
          auth_api_helper_url: process.env.APP_API_HELPER_URL,
        }
      })

        on('task', {
          removeUser
        })
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: process.env.APP_WEB_URL
  },
});
