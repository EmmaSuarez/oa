export default function LoginPage() {
  return (
    <form action="/api/auth/login" method="post" className="card section" style={{ maxWidth: 480, margin: "0 auto", display: "grid", gap: 12 }}>
      <h1 style={{ margin: 0 }}>Login</h1>
      <input className="input" type="email" name="email" placeholder="Email" required />
      <input className="input" type="password" name="password" placeholder="Password" required />
      <button className="button" type="submit">Login</button>
    </form>
  );
}
