
require ( 'dotenv' ) . config ( )
const { defineConfig } = require("cypress");


module.exports = defineConfig({
  requestTimeout: 30000,
  responseTimeout: 30000,
  defaultCommandTimeout: 30000,
  e2e: {
    
    baseUrl: "https://www.cypress.io",
    env: {
      API_KEY: "86f96d5d3a8fe2e5814a99f320cf3a428320241ab9d946cd74efb1c21edc231f"
    }
  }
});