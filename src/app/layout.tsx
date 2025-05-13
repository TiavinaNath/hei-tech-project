import './globals.css'
import StaticNavbarWrapper from '@/components/features/accueil/StaticNavbarWrapper'

export const metadata = {
  title: 'HEI Tech',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <StaticNavbarWrapper>
          {children}
        </StaticNavbarWrapper>
      </body>
    </html>
  )
}
