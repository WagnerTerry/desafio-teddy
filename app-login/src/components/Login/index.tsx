import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // Importe useHistory para redirecionar o usuário
import './styles.css'; // Importando o arquivo de estilos CSS

const LoginForm = () => {
//   const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
      // Redirecionar para outra página se o usuário já estiver autenticado
    //   navigate('/dashboard');
    }
  }, []); // O segundo argumento [] garante que este efeito só seja executado uma vez, quando o componente é montado

  const handleLogin = (e) => {
    e.preventDefault();
    // Verificar se as credenciais estão corretas
    if (username === 'admin' && password === 'root') {
      // Salvar detalhes do usuário no localStorage
      localStorage.setItem('user', JSON.stringify({ username }));
      setIsLoggedIn(true);
      // Redirecionar para outra página após o login
    //   navigate('/dashboard');
    } else {
      alert('Credenciais inválidas. Tente novamente.');
    }
  };

  if (isLoggedIn) {
    return null; // Se o usuário estiver logado, não exibir a tela de login
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
