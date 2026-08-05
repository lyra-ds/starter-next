'use client'

import { useState } from 'react'
import {
  Badge,
  Button,
  Card,
  Container,
  Input,
  Stack,
  useTheme,
} from '@lyra-ds/react'

type Theme = 'light' | 'dark' | 'system'
type Brand = 'lyra' | 'atlas' | 'moss'

const brands: Array<{ value: Brand; label: string }> = [
  { value: 'lyra', label: 'Lyra' },
  { value: 'atlas', label: 'Atlas' },
  { value: 'moss', label: 'Moss' },
]

function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()

  return (
    <Stack>
      <div>
        <strong>Appearance</strong>
        <p>Choose a theme or follow your system preference.</p>
      </div>
      <div role="group" aria-label="Theme preference">
        {(['light', 'dark', 'system'] as Theme[]).map((option) => (
          <Button
            key={option}
            type="button"
            variant={theme === option ? 'primary' : 'secondary'}
            onClick={() => setTheme(option)}
          >
            {option}
          </Button>
        ))}
      </div>
      <p>Currently using the {resolvedTheme} theme.</p>
    </Stack>
  )
}

export function StarterDemo() {
  const [brand, setBrand] = useState<Brand>('lyra')

  return (
    <main data-brand={brand}>
      <Container>
        <Stack>
          <header>
            <Badge>Next.js starter</Badge>
            <h1>Make Lyra yours.</h1>
            <p>
              This small settings screen uses Lyra’s public styles and React
              components, with live theme and white-label brand controls.
            </p>
          </header>

          <Card>
            <Stack>
              <div>
                <h2>Workspace settings</h2>
                <p>Set a familiar foundation, then carry the same tokens across your product.</p>
              </div>

              <label htmlFor="workspace-name">
                Workspace name
                <Input id="workspace-name" defaultValue="Northstar" />
              </label>

              <label htmlFor="workspace-domain">
                Workspace domain
                <Input id="workspace-domain" defaultValue="northstar.lyra" />
              </label>

              <ThemeToggle />

              <div>
                <strong>Brand</strong>
                <p>Only four brand tokens change; the rest of the system derives from them.</p>
                <div role="group" aria-label="Brand">
                  {brands.map((option) => (
                    <Button
                      key={option.value}
                      type="button"
                      variant={brand === option.value ? 'primary' : 'secondary'}
                      onClick={() => setBrand(option.value)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Button type="button" variant="primary">
                  Save changes
                </Button>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </div>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </main>
  )
}
