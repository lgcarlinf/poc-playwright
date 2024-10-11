import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';
import path from 'path';

const read = (key: string, defaultValue?: any) => {
    return process.env[key] ?? defaultValue;
};

const getBaseUrl = () => {
    const maybePort = read('PORT', 3000);
    return read('IS_LOCAL_TEST') ?
        (read('LOCAL_TEST_URL', `http://localhost:${maybePort}`))
        : read('DEPLOYED_URL');
}

const baseURL = getBaseUrl();

export default defineConfig({
    testDir: 'tests',
    fullyParallel: true,
    forbidOnly: !!read('CI'),
    retries: read('CI') ? 2 : 0,
    workers: read('CI') ? 1 : undefined,
    reporter: [['html'], ['json', { outputFile: 'test-results/results.json' }]],
    use: {
        headless: !read('PLAYWRIGHT_NO_HEADLESS', true),
        baseURL,
        trace: {
            mode: 'on',
            snapshots: true,
            screenshots: true,
            sources: true,
            attachments: true
        },
        video: 'on',
        contextOptions: {
            recordHar: {
                path: path.join(__dirname, 'playwright', 'chromium.har'),
            }
        }
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
    ],
    webServer: {
        command: read('IS_LOCAL_DEV_TEST') ? 'npm run dev' : 'npm run preview',
        url: baseURL,
        reuseExistingServer: !read('CI'),
    },
});