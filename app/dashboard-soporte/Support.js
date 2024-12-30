import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Support() {
  const [usuarios, setUsuarios] = useState([]);
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    // Obtén datos de usuarios desde WordPress usando el plugin
    axios.get('https://altoqueperuwk.com/wp-json/wp/v2/users')
      .then(response => setUsuarios(response.data))
      .catch(error => console.error('Error al obtener usuarios:', error));

    // Obtén datos de reservas desde WordPress usando el plugin
    axios.get('https://altoqueperuwk.com/wp-json/wp/v2/reservations') // Ajusta esto según el endpoint real.
      .then(response => setReservas(response.data))
      .catch(error => console.error('Error al obtener reservas:', error));
  }, []);

  return (
    <div>
      <h1>Soporte</h1>
      <h2>Usuarios</h2>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>
            <p>Nombre: {usuario.name}</p>
            <p>Email: {usuario.name}</p>
            <img src={usuario.avatar_urls['48']} alt="Avatar" />
          </li>
        ))}
      </ul>
      <h2>Reservas</h2>
      <ul>
        {reservas.map(reserva => (
          <li key={reserva.id}>{reserva.details}</li>
        ))}
      </ul>
    </div>
  );
}

export default Support;
