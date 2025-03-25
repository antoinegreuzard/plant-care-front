import { defineConfig } from "cypress";
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:4173",
    supportFile: "cypress/support/e2e.ts",
  },

  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
      viteConfig: {
        plugins: [vue()],
      },
    },
    specPattern: 'cypress/components/**/*.cy.ts',
  },
});
