
require ( 'dotenv' ) . config ( )
const { defineConfig } = require("cypress");


module.exports = defineConfig({
  requestTimeout: 30000,
  responseTimeout: 30000,
  defaultCommandTimeout: 30000,
  e2e: {
    
    baseUrl: "https://www.cypress.io",
    env: {
      API_KEY: "a03f07046b273170729a3b4538359b8601028c79eae4de6bf6b87142e18a029e"
    }
  }
});