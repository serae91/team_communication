import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    setError("");
    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password}),
      });

      if (res.status === 201) {
        alert("Registration successful!");
        navigate("/login");
      } else if (res.status === 409) {
        setError("Username already exists");
      } else {
        setError("Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Registration failed");
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <input
        placeholder="Username"
        value={ username }
        onChange={ (e) => setUsername(e.target.value) }
      />
      <input
        type="password"
        placeholder="Password"
        value={ password }
        onChange={ (e) => setPassword(e.target.value) }
      />
      <button onClick={ handleRegister }>Register</button>
      <button onClick={ () => navigate("/login") }>Go to Login</button>
      { error && <p style={ {color: "red"} }>{ error }</p> }
    </div>
  );
}
