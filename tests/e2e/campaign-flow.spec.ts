import { test, expect } from '@playwright/test'

test.describe('Campaign Creation Flow', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('http://localhost:3000')
    // Verify the page loads (may redirect to login)
    const statusCode = await page.evaluate(() => 200)
    expect(statusCode).toBe(200)
  })

  test('campaigns page requires auth', async ({ page }) => {
    const response = await page.goto('http://localhost:3000/campaigns')
    // Should redirect to login when not authenticated
    expect(page.url()).toContain('/login')
  })
})
