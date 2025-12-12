
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from '../../../providers/auth/AuthProvider.tsx';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  async function handleLogin() {
    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // wichtig für Cookies
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      setIsAuthenticated(true);
      navigate("/dashboard");
    } else {
      alert("Login fehlgeschlagen");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <input value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
