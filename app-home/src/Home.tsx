import React from 'react';

const Home: React.FC = () => {
  const username = localStorage.getItem('user');

  return (
    <div>
      <h1>Bem-vindo, {JSON.parse(username)}!</h1>
      <p>Obrigado por se juntar a nós.</p>
      <p>Esperamos que você aproveite sua experiência 😃 .</p>
    </div>
  );
};

export default Home;