import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ImageModal from '../../src/components/ImageModal';
import '../support/userdetail.css'; // Importa el CSS para estilos de la página

const UserDetail = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    if (userId) {
      // Función para consultar el usuario por ID desde el endpoint personalizado
      const fetchUser = async () => {
        try {
          // URL para obtener el usuario con ID desde el endpoint personalizado
          const response = await axios.get('https://altoqueperuwk.com/wp-admin/admin-ajax.php', {
            params: {
              action: 'altoke_get_user_data_new',
              user_id: userId
            }
          });

          console.log('Respuesta completa de la API:', response.data);

          if (response.data.success) {
            const userData = {
              id: userId, // ID del usuario
              name: response.data.data.nombre_apellido,
              email: response.data.data.email,
              dni: response.data.data.dni,
              whatsapp: response.data.data.whatsapp,
              codigoPromocional: response.data.data.codigo_promocional,
              linkDniAnverso: response.data.data.dniFrontUrl, // Usar el meta del DNI anverso
              linkDniReverso: response.data.data.dniBackUrl, // Usar el meta del DNI reverso
              linkFotoPerfilConDni: response.data.data.profile_image_url, // Usar el meta de la foto del perfil con DNI
              linkFotoTarjeta: response.data.data.card_images_urls // Usar el meta de la foto de la tarjeta
            };

            console.log('Datos del usuario:', userData); // Agregar logging para depuración

            setUser(userData);
          } else {
            console.error('Error al obtener los datos del usuario:', response.data.message);
          }
        } catch (error) {
          console.error('Error al obtener el usuario:', error);
        }
      };

      fetchUser();
    }
  }, [userId]);

  const openModal = (imageUrl) => {
    setCurrentImage(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentImage('');
  };

  return (
    <div className="user-detail">
      <h1>Detalles de {user?.name}</h1>
      {user ? (
        <div>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>DNI:</strong> {user.dni}</p>
          <p><strong>Whatsapp:</strong> {user.whatsapp}</p>
          <p><strong>Código promocional:</strong> {user.codigoPromocional}</p>
          <p><strong>Link DNI anverso:</strong> <button onClick={() => openModal(user.linkDniAnverso)}>Ver</button></p>
          <p><strong>Link DNI reverso:</strong> <button onClick={() => openModal(user.linkDniReverso)}>Ver</button></p>
          <p><strong>Link foto perfil con DNI:</strong> <button onClick={() => openModal(user.linkFotoPerfilConDni)}>Ver</button></p>
          <p><strong>Link foto tarjeta:</strong> {user.linkFotoTarjeta && user.linkFotoTarjeta.map((card, index) => (
            <button key={index} onClick={() => openModal(card.cardImage)}>Ver {card.bank}</button>
          ))}</p>
          <button onClick={() => { /* Función para enviar el email de confirmación */ }}>
            Enviar Email de Confirmación
          </button>
        </div>
      ) : (
        <p>No se encontraron datos para el usuario con ID {userId}.</p>
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        imageUrl={currentImage}
      />
    </div>
  );
};

export default UserDetail;
