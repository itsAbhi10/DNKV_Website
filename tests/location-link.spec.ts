import { test, expect } from '@playwright/test'

test.describe('School Location & Google Maps Links', () => {
  test('Homepage: Location link, directions link, and direct map view', async ({ page }) => {
    await page.goto('/')

    // Address link in admissions / campus card
    const addressLink = page.locator('a[aria-label="Open DNKV location in Google Maps (opens in a new tab)"]').first()
    await expect(addressLink).toBeVisible()

    const addressHref = await addressLink.getAttribute('href')
    // Matches either Google Maps search query or the exact shortlink
    expect(addressHref).toMatch(/maps\.app\.goo\.gl|google\.com\/maps/)
    expect(await addressLink.getAttribute('target')).toBe('_blank')
    expect(await addressLink.getAttribute('rel')).toContain('noopener')
    expect(await addressLink.getAttribute('rel')).toContain('noreferrer')

    // "Get directions" link
    const directionsLink = page.locator('a[aria-label="Get directions to DNKV in Google Maps (opens in a new tab)"]').first()
    await expect(directionsLink).toBeVisible()

    const directionsHref = await directionsLink.getAttribute('href')
    expect(directionsHref).toMatch(/^https:\/\/(www\.)?google\.com\/maps\/dir\/\?api=1&destination=/)
    expect(await directionsLink.getAttribute('target')).toBe('_blank')
    expect(await directionsLink.getAttribute('rel')).toContain('noopener')
    expect(await directionsLink.getAttribute('rel')).toContain('noreferrer')

    // Direct map view iframe should be visible directly with lazy loading
    const mapIframe = page.locator('iframe[title="Dr. Netaji Karale Vidyalaya Campus Map"]').first()
    await expect(mapIframe).toBeVisible()
    expect(await mapIframe.getAttribute('loading')).toBe('lazy')
    expect(await mapIframe.getAttribute('src')).toContain('18.1115625')
    expect(await mapIframe.getAttribute('src')).toContain('75.4519531')
  })

  test('Footer: Address and directions links are present with required attributes', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer[aria-label="School Footer"]')
    await expect(footer).toBeVisible()

    const footerAddressLink = footer.locator('a[aria-label="Open DNKV location in Google Maps (opens in a new tab)"]')
    await expect(footerAddressLink).toBeVisible()

    const footerHref = await footerAddressLink.getAttribute('href')
    expect(footerHref).toMatch(/maps\.app\.goo\.gl|google\.com\/maps/)
    expect(await footerAddressLink.getAttribute('target')).toBe('_blank')
    expect(await footerAddressLink.getAttribute('rel')).toContain('noopener')
    expect(await footerAddressLink.getAttribute('rel')).toContain('noreferrer')

    const footerDirectionsLink = footer.locator('a[aria-label="Get directions to DNKV in Google Maps (opens in a new tab)"]')
    await expect(footerDirectionsLink).toBeVisible()
    expect(await footerDirectionsLink.getAttribute('target')).toBe('_blank')
  })

  test('Contact Page: School campus office has location link and direct map view', async ({ page }) => {
    await page.goto('/contact')

    const addressLinks = page.locator('a[aria-label="Open DNKV location in Google Maps (opens in a new tab)"]')
    expect(await addressLinks.count()).toBeGreaterThanOrEqual(1)

    const firstAddressLink = addressLinks.first()
    await expect(firstAddressLink).toBeVisible()
    expect(await firstAddressLink.getAttribute('href')).toMatch(/maps\.app\.goo\.gl|google\.com\/maps/)
    expect(await firstAddressLink.getAttribute('target')).toBe('_blank')
    expect(await firstAddressLink.getAttribute('rel')).toContain('noopener')
    expect(await firstAddressLink.getAttribute('rel')).toContain('noreferrer')

    const directionsLinks = page.locator('a[aria-label="Get directions to DNKV in Google Maps (opens in a new tab)"]')
    expect(await directionsLinks.count()).toBeGreaterThanOrEqual(1)
    expect(await directionsLinks.first().getAttribute('href')).toMatch(/^https:\/\/(www\.)?google\.com\/maps\/dir/)

    // Direct map iframe
    const mapIframe = page.locator('iframe[title="Dr. Netaji Karale Vidyalaya Campus Map"]').first()
    await expect(mapIframe).toBeVisible()
    expect(await mapIframe.getAttribute('src')).toContain('18.1115625')
  })

  test('Admissions Enquiry Page: Visit our campus card has location link and direct map view', async ({ page }) => {
    await page.goto('/admissions/enquiry')

    const addressLink = page.locator('a[aria-label="Open DNKV location in Google Maps (opens in a new tab)"]').first()
    await expect(addressLink).toBeVisible()
    expect(await addressLink.getAttribute('href')).toMatch(/maps\.app\.goo\.gl|google\.com\/maps/)
    expect(await addressLink.getAttribute('target')).toBe('_blank')
    expect(await addressLink.getAttribute('rel')).toContain('noopener')
    expect(await addressLink.getAttribute('rel')).toContain('noreferrer')

    const directionsLink = page.locator('a[aria-label="Get directions to DNKV in Google Maps (opens in a new tab)"]').first()
    await expect(directionsLink).toBeVisible()
    expect(await directionsLink.getAttribute('href')).toMatch(/^https:\/\/(www\.)?google\.com\/maps\/dir/)

    // Direct map iframe
    const mapIframe = page.locator('iframe[title="Dr. Netaji Karale Vidyalaya Campus Map"]').first()
    await expect(mapIframe).toBeVisible()
    expect(await mapIframe.getAttribute('src')).toContain('18.1115625')
  })
})
