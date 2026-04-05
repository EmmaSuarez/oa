import "./globals.css"
import Link from "next/link"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="wrap">
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24}}>
            <Link href="/"><strong>Warleague</strong></Link>
            <div style={{display:"flex", gap:16}}>
              <Link href="/">Home</Link>
            </div>
          </div>
          {children}
        </div>
      </body>
    </html>
  )
}
