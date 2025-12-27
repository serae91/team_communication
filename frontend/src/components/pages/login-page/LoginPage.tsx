import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../../providers/auth/AuthProvider.tsx';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useAuth();
  const navigate = useNavigate();

  async function handleLogin() {
    const res = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({username, password})
    });
    console.log('res', res);
    if (!res.ok) {
      alert('Login failed');
      return;
    }

    const data = await res.json();
    console.log('data', data);
    const jwtToken = data.token;
    localStorage.setItem('authToken', jwtToken);


    try {
      const meRes = await fetch('http://localhost:8080/auth/me', {credentials: 'include'});

      if (!meRes.ok) {
        console.error('Could not fetch user info, status:', meRes.status);
        alert('Could not load user info');
        return;
      }

      const loggedInUser = await meRes.json();
      setUser(loggedInUser);
      navigate('/mainpage');
    } catch (err) {
      console.error('Failed to fetch user info:', err);
      alert('Could not load user info');
    }
  }


  return (
    <div>
      <h1>Login</h1>
      <input value={ username } onChange={ e => setUsername(e.target.value) } placeholder="Username"/>
      <input type="password" value={ password } onChange={ e => setPassword(e.target.value) } placeholder="Password"/>
      <button onClick={ handleLogin }>Login</button>
      <button onClick={ () => navigate('/register') }>Go to Register</button>
    </div>
  );
};

export default LoginPage;
