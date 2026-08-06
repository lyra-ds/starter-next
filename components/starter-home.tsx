'use client'

import { useState } from 'react'
import { Badge, Button, Card, Icon, IconButton, useTheme } from '@lyra-ds/react'

type Theme = 'light' | 'dark'
type Brand = 'lyra' | 'atlas' | 'moss'

const brands: Array<{ value: Brand; label: string }> = [
  { value: 'lyra', label: 'Lyra' },
  { value: 'atlas', label: 'Atlas' },
  { value: 'moss', label: 'Moss' },
]

const themes: Array<{ value: Theme; icon: 'sun' | 'moon' }> = [
  { value: 'light', icon: 'sun' },
  { value: 'dark', icon: 'moon' },
]

export function StarterHome() {
  const { resolvedTheme, setTheme } = useTheme()
  const [brand, setBrand] = useState<Brand>('lyra')

  return (
    // Lyra is the baseline look: the [data-brand] contract requires --brand tokens,
    // so the attribute is only set for the white-label brands defined in brand.css.
    <main className="home" data-brand={brand === 'lyra' ? undefined : brand}>
      <header className="home__hero">
        {/* The mark swaps with the theme, same pattern as the DS Brand component. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- static theme-swapped SVG marks, next/image adds nothing */}
        <img className="home__mark" src="/lyra-mark.svg" alt="" width={72} height={72} />
        {/* eslint-disable-next-line @next/next/no-img-element -- static theme-swapped SVG marks, next/image adds nothing */}
        <img
          className="home__mark home__mark--dark"
          src="/lyra-mark-light.svg"
          alt=""
          width={72}
          height={72}
        />
        <Badge>Next.js starter</Badge>
        <h1>Lyra Design System</h1>
        <p>
          CSS-first design tokens and accessible React components. White-label an entire product by
          overriding four variables.
        </p>
      </header>

      <p className="home__hint">
        Get started by editing <code>app/page.tsx</code>.
      </p>

      <div className="button-group" role="group" aria-label="Actions">
        <Button asChild>
          <a href="https://lyra-ds.dev">Documentation</a>
        </Button>
        <Button asChild variant="secondary">
          <a href="https://github.com/lyra-ds/lyra">GitHub</a>
        </Button>
      </div>

      <Card className="home__checklist" title="After cloning">
        <ul>
          <li>
            Replace the example brands in <code>app/brand.css</code> with your own.
          </li>
          <li>
            Swap the favicon in <code>app/icon.svg</code>.
          </li>
          <li>
            Delete the demo component <code>components/starter-home.tsx</code> and replace{' '}
            <code>app/page.tsx</code>.
          </li>
        </ul>
      </Card>

      <footer className="home__controls">
        <div role="group" aria-label="Theme preference" className="button-group">
          {themes.map((option) => (
            <IconButton
              key={option.value}
              type="button"
              size="sm"
              label={option.value}
              variant={resolvedTheme === option.value ? 'primary' : 'ghost'}
              aria-pressed={resolvedTheme === option.value}
              onClick={() => setTheme(option.value)}
            >
              <Icon name={option.icon} size={16} />
            </IconButton>
          ))}
        </div>
        <div role="group" aria-label="Brand" className="button-group">
          {brands.map((option) => (
            <Button
              key={option.value}
              type="button"
              size="sm"
              variant={brand === option.value ? 'primary' : 'ghost'}
              aria-pressed={brand === option.value}
              onClick={() => setBrand(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
        <p>Currently using the {resolvedTheme} theme.</p>
      </footer>
    </main>
  )
}
