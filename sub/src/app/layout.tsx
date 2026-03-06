import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EliteProfessionals — Verified Insider Pack · March 2026',
  description: 'Get the EliteProfessionals Verified Insider Information Pack — exclusive intelligence, deal flow, and strategies from our network of 2,800+ professionals.',
  openGraph: {
    title: 'EliteProfessionals — Verified Insider Pack',
    description: 'The intelligence insiders don\'t want you to have. Free for March 2026.',
    type: 'website',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
