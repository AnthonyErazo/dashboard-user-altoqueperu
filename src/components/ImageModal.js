import React from 'react';
import Modal from 'react-modal';
import Image from 'next/image';

// Definir el App Element para mejorar la accesibilidad
if (typeof window !== 'undefined') {
  Modal.setAppElement('#__next');
}

const ImageModal = ({ isOpen, onRequestClose, imageUrl }) => (
  <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
    <div>
      <Image src={imageUrl} alt="Imagen del DNI" layout="responsive" width={500} height={500} />
      <button onClick={onRequestClose}>Cerrar</button>
    </div>
  </Modal>
);

export default ImageModal;
