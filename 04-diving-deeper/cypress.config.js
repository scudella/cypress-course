import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        // allow you to run code outside of the browser
        seedDatabase(filename) {
          // Run your nodeJs code
          // e.g., edit a file here
          // make an http request here
          // run sql queries
          return filename;
        },
      });
    },
  },
});
