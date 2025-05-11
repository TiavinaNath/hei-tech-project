import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'HEI Tech'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
