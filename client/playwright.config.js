import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    use: {
        baseURL: 'http://localhost:5173',
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
    },
    webServer: {
        command: 'npm run dev',
        port: 5173,
        reuseExistingServer: true,
        timeout: 120 * 1000,
    },
    timeout: 60 * 1000,
});
