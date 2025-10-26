import { Providers } from './providers'

export const metadata = {
  title: 'Austin J. Hardy | Developer & Researcher | nitsuah.io',
  description: 'Personal portfolio showcasing cryptography research, enterprise automation tools, and Web3 experiments. Austin J. Hardy\'s selected projects and technical work.',
  keywords: 'Austin Hardy, nitsuah, developer, cryptography, Web3, Python, Next.js, portfolio, blockchain, automation',
  authors: [{ name: 'Austin J. Hardy', url: 'https://nitsuah.io' }],
  creator: 'Austin J. Hardy',
  publisher: 'Austin J. Hardy',
  metadataBase: new URL('https://nitsuah.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nitsuah.io',
    siteName: 'nitsuah.io',
    title: 'Austin J. Hardy | Developer & Researcher',
    description: 'Personal portfolio showcasing cryptography research, enterprise automation tools, and Web3 experiments.',
    images: [
      {
        url: '/social-preview.png',
        width: 1200,
        height: 630,
        alt: 'Austin J. Hardy - Developer & Researcher Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Austin J. Hardy | Developer & Researcher',
    description: 'Personal portfolio showcasing cryptography research, enterprise automation tools, and Web3 experiments.',
    images: ['/social-preview.png'],
    creator: '@nitsuah',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
