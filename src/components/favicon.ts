/**
 * Favicon
 *
 * Handles favicon theming based on OS/Browser theme (light/dark).
 * Watches theme changes and updates accordingly.
 */

let oldHref: string

/**
 * Updates
 * @param newHref
 * @param colorTheme
 */
function updateFavicon(newHref?: string, colorTheme?: string) {
  const favicon = document.querySelector<HTMLLinkElement>('.ts-favicon[type="image/svg+xml"]')
  const faviconFallback = document.querySelector<HTMLLinkElement>('.ts-favicon[type="image/png"]')

  if (!colorTheme) colorTheme = 'light'
  const colorThemeSuffix = (colorTheme) === 'light' ? '' : '-dark'

  if (favicon && faviconFallback) {
    if (!oldHref) oldHref = favicon.href

    if (newHref) {
      newHref = newHref.substring(0, newHref.lastIndexOf('.'))
      newHref = `${newHref}${colorThemeSuffix}`

      favicon.href = `${newHref}.svg`
      faviconFallback.href = `${newHref}.png`

    } else {
      const dark = favicon.href.indexOf('-dark.svg')
      const newFaviconName = favicon.href.substring(0, dark !== -1 ? dark : favicon.href.lastIndexOf('.'))
      newHref = `${newFaviconName}${colorThemeSuffix}`

      favicon.href = `${newHref}.svg`
      faviconFallback.href = `${newHref}.png`
    }
  }
}

function prefersDarkColorScheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

// Page Load
if (prefersDarkColorScheme()) {
  updateFavicon(undefined, 'dark')
}

// Theme Change
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  updateFavicon(undefined, prefersDarkColorScheme() ? 'dark' : 'light')
})