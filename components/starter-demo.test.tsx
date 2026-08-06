import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@lyra-ds/react'
import { afterEach, describe, expect, it } from 'vitest'

import { StarterDemo } from './starter-demo'

afterEach(cleanup)

function renderStarterDemo() {
  return render(
    <ThemeProvider>
      <StarterDemo />
    </ThemeProvider>,
  )
}

describe('StarterDemo', () => {
  it("renders the heading 'Make Lyra yours.'", () => {
    renderStarterDemo()

    expect(screen.getByRole('heading', { name: 'Make Lyra yours.' })).toBeInTheDocument()
  })

  it("sets data-brand='atlas' when Atlas is clicked", async () => {
    const user = userEvent.setup()
    renderStarterDemo()

    await user.click(screen.getByRole('button', { name: 'Atlas' }))

    expect(screen.getByRole('main')).toHaveAttribute('data-brand', 'atlas')
  })

  it("shows the dark theme after clicking 'dark'", async () => {
    const user = userEvent.setup()
    renderStarterDemo()

    await user.click(screen.getByRole('button', { name: 'dark' }))

    expect(screen.getByText('Currently using the dark theme.')).toBeInTheDocument()
  })
})
