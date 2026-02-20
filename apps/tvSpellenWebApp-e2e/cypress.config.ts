import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'npx nx run @org/tvSpellenWebApp:dev',
        production: 'npx nx run @org/tvSpellenWebApp:preview',
      },
      ciWebServerCommand: 'npx nx run @org/tvSpellenWebApp:preview',
      ciBaseUrl: 'http://localhost:4200', // http://localhost:4200 http://0.0.0.0:4200
    }),
    baseUrl: 'http://localhost:4200', // http://localhost:4200 http://0.0.0.0:4200
  },
});
