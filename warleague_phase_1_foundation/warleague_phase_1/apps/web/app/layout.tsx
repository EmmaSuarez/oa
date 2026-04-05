import "./globals.css";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="container header-inner">
            <Link href="/" style={{ fontWeight: 700, fontSize: 22 }}>Warleague</Link>
            <nav className="nav">
              <Link href="/standings">Global standings</Link>
              <Link href="/leagues/current">Current league</Link>
              {user ? <Link href="/dashboard">Dashboard</Link> : <Link href="/login">Login</Link>}
              {!user ? <Link href="/register">Register</Link> : null}
              {user?.role === "ADMIN" ? <Link href="/admin">Admin</Link> : null}
            </nav>
          </div>
        </header>
        <main className="container" style={{ paddingTop: 24, paddingBottom: 40 }}>{children}</main>
      </body>
    </html>
  );
}
