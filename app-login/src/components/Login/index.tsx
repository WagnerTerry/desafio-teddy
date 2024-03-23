import React, { useState, useEffect } from 'react';
import * as singleSpa from 'single-spa';
import './styles.css'; 
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
      singleSpa.navigateToUrl('/app-home');
    }
  }, []); 

  const handleLogin = (e) => {
    e.preventDefault();
    // Verificar se as credenciais estão corretas
    if (username === 'admin' && password === 'root') {
      // Salvar detalhes do usuário no localStorage
      localStorage.setItem('user', JSON.stringify({ username }));
      setIsLoggedIn(true);
      singleSpa.navigateToUrl('/app-home');
      
    } else {
      alert('Credenciais inválidas. Tente novamente.');
    }
  };

  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
