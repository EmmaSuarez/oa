export default function RegisterPage() {
  return (
    <form action="/api/auth/register" method="post" className="card section" style={{ maxWidth: 480, margin: "0 auto", display: "grid", gap: 12 }}>
      <h1 style={{ margin: 0 }}>Create account</h1>
      <input className="input" type="text" name="displayName" placeholder="Display name" required />
      <input className="input" type="email" name="email" placeholder="Email" required />
      <input className="input" type="password" name="password" placeholder="Password" required />
      <button className="button" type="submit">Create account</button>
    </form>
  );
}
