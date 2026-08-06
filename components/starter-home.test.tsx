import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@lyra-ds/react'
import { afterEach, describe, expect, it } from 'vitest'

import { StarterHome } from './starter-home'

afterEach(cleanup)

function renderStarterHome() {
  return render(
    <ThemeProvider>
      <StarterHome />
    </ThemeProvider>,
  )
}

describe('StarterHome', () => {
  it("renders the heading 'Lyra Design System'", () => {
    renderStarterHome()

    expect(screen.getByRole('heading', { name: 'Lyra Design System' })).toBeInTheDocument()
  })

  it('links to the documentation and the GitHub repository', () => {
    renderStarterHome()

    expect(screen.getByRole('link', { name: 'Documentation' })).toHaveAttribute(
      'href',
      'https://lyra-ds.dev',
    )
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/lyra-ds/lyra',
    )
  })

  it('lists the post-clone checklist', () => {
    renderStarterHome()

    expect(screen.getByText(/replace the example brands/i)).toBeInTheDocument()
    expect(screen.getByText(/swap the favicon/i)).toBeInTheDocument()
    expect(screen.getByText(/delete the demo component/i)).toBeInTheDocument()
  })

  it('renders the default Lyra brand without data-brand (baseline tokens)', () => {
    renderStarterHome()

    expect(screen.getByRole('main')).not.toHaveAttribute('data-brand')
  })

  it("sets data-brand='atlas' when Atlas is clicked", async () => {
    const user = userEvent.setup()
    renderStarterHome()

    await user.click(screen.getByRole('button', { name: 'Atlas' }))

    expect(screen.getByRole('main')).toHaveAttribute('data-brand', 'atlas')
  })

  it('removes data-brand when switching back to Lyra', async () => {
    const user = userEvent.setup()
    renderStarterHome()

    await user.click(screen.getByRole('button', { name: 'Atlas' }))
    await user.click(screen.getByRole('button', { name: 'Lyra' }))

    expect(screen.getByRole('main')).not.toHaveAttribute('data-brand')
  })

  it("shows the dark theme after clicking 'dark'", async () => {
    const user = userEvent.setup()
    renderStarterHome()

    await user.click(screen.getByRole('button', { name: 'dark' }))

    expect(screen.getByText('Currently using the dark theme.')).toBeInTheDocument()
  })

  it('lays out button rows with the button-group utility', () => {
    renderStarterHome()

    expect(screen.getByRole('group', { name: 'Theme preference' })).toHaveClass('button-group')
    expect(screen.getByRole('group', { name: 'Brand' })).toHaveClass('button-group')
  })
})
