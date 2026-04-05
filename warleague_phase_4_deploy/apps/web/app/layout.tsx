import "./globals.css"
import Link from "next/link"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="wrap">
          <header className="topbar">
            <Link href="/" className="brand">Warleague</Link>
            <nav className="nav">
              <Link href="/">Home</Link>
              <Link href="/standings">Standings</Link>
              <Link href="/leagues/current">Current League</Link>
              <Link href="/rules">Rules</Link>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
