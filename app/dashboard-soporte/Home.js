import React from 'react';
import Link from 'next/link';
import '../../pages/support/home.css';  // Ajusta la ruta según la ubicación de tu archivo CSS

const Home = () => {
  return (
    <div className="home">
      <h1>Bienvenido al Dashboard</h1>
      <div className="buttons-container">
        <Link href="/support/Userlist" legacyBehavior>
          <a className="button-link">
            <button className="button">Usuarios</button>
          </a>
        </Link>
        <Link href="/support/reservations" legacyBehavior>
          <a className="button-link">
            <button className="button">Transacciones</button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
