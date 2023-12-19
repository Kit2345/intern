import { test, expect } from '@playwright/test';
require('dotenv').config({ path: '../.env.local' });



test('should pick a random name', async ({ page }) => {
  // Navigate to the login page
  await page.goto('http://localhost:3000/login');

  // Retrieve environment variables
  const MY_EMAIL = process.env.MY_EMAIL!;
  const MY_PASSWORD = process.env.MY_PASSWORD!;

  // Fill in the email and password fields
  await page.fill('input[name="email"]', MY_EMAIL);
  await page.fill('input[name="password"]', MY_PASSWORD);

  // Click the "Login" button
  await page.click('button:has-text("Login")');

  // Wait for navigation after login
  await page.waitForNavigation();

  // Navigate to the homepage
  await page.goto('http://localhost:3000/');
});

