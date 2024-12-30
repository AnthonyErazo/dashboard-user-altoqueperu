import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import '../../pages/support/userlist.css'; // Asegúrate de tener el archivo CSS para los estilos de Userlist.js

const Userlist = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Función para consultar todos los usuarios desde el endpoint personalizado
    const fetchUsers = async () => {
      try {
        // URL para obtener todos los usuarios desde el endpoint personalizado
        const response = await axios.get('https://altoqueperuwk.com/wp-admin/admin-ajax.php', {
          params: {
            action: 'altoke_get_all_users_data'
          }
        });

        if (response.data.success) {
          setUsers(response.data.data);
        } else {
          console.error('Error al obtener los datos de los usuarios:', response.data.message);
        }
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="userlist">
      <h1>Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombres y Apellidos</th>
            <th>DNI</th>
            <th>Whatsapp</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <Link href={`/user/${user.id}`}>{user.nombre_apellido}</Link>
              </td>
              <td>{user.dni}</td>
              <td>{user.whatsapp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
