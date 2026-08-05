import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import '@lyra-ds/styles'
import '@fontsource/plus-jakarta-sans/400.css'
import '@fontsource/plus-jakarta-sans/500.css'
import '@fontsource/plus-jakarta-sans/600.css'
import '@fontsource/plus-jakarta-sans/700.css'
import '@fontsource/jetbrains-mono/400.css'
import { ThemeProvider } from '@lyra-ds/react'
import './brand.css'

export const metadata: Metadata = {
  title: 'Lyra DS Next.js starter',
  description: 'A minimal Next.js starter for Lyra Design System.',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
