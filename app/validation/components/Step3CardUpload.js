"use client";

import { useState, useEffect } from 'react';
import { FaCloudUploadAlt, FaTrashAlt } from 'react-icons/fa';
import Image from "next/legacy/image";

// Limites de tamaño y cantidad de tarjetas
const MAX_SIZE_MB = 20;
const MAX_CARDS = 20;
const banks = ['INTERBANK', 'BCP', 'BBVA', 'BanBif', 'Scotiabank'];

// Función para validar el tipo de archivo
const isValidFileType = (file) => {
  const validTypes = ['image/jpeg', 'image/png'];
  return validTypes.includes(file.type) && file.size <= MAX_SIZE_MB * 1024 * 1024;
};

// Función para enviar la imagen al servidor
const uploadImageToServer = async (file) => {
  try {
    const formData = new FormData();
    formData.append("action", "altoke_upload_image");
    formData.append("image", file);

    const response = await fetch("https://altoqueperuwk.com/wp-admin/admin-ajax.php", {
      method: "POST",
      body: formData,
      credentials: "include", // Si necesitas autenticación, añade credenciales
    });

    const result = await response.json();

    if (result.success) {
      console.log("Imagen cargada correctamente: ", result.data.url);
      return result.data.url; // Retorna la URL de la imagen cargada
    } else {
      console.error("Error al cargar la imagen: ", result.data.message);
    }
  } catch (error) {
    console.error("Error en la solicitud AJAX: ", error);
  }
};

// Función para guardar las URLs de las tarjetas al usuario
const saveCardUrls = async (cards) => {
  try {
    const formData = new FormData();
    formData.append("action", "altoke_guardar_tarjeta_urls");

    // Convertir el array de tarjetas en un string JSON
    const cardsJson = JSON.stringify(cards);
    formData.append("cards", cardsJson);

    console.log("Enviando URLs de las tarjetas:", cardsJson); // Depuración

    const response = await fetch("https://altoqueperuwk.com/wp-admin/admin-ajax.php", {
      method: "POST",
      body: formData,
      credentials: "include",
    });


    const result = await response.json();

    if (result.success) {
      console.log("URLs de tarjetas guardadas correctamente");
    } else {
      console.error("Error al guardar las URLs de las tarjetas");
    }
  } catch (error) {
    console.error("Error en la solicitud de guardar tarjetas: ", error);
  }
};

export default function Step3CardUpload({ nextStep, prevStep, onCompletion }) {
  const [cards, setCards] = useState(
    JSON.parse(localStorage.getItem('cards')) || [{ bank: 'INTERBANK', cardImage: '' }]
  );
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  const handleBankChange = (index, value) => {
    const updatedCards = [...cards];
    updatedCards[index].bank = value;
    setCards(updatedCards);
    setErrorMessage('');
  };

  const handleFileChange = async (index, e) => {
    const file = e.target.files[0];
    if (file && isValidFileType(file)) {
      try {
        const imageUrl = await uploadImageToServer(file);
        const updatedCards = [...cards];
        updatedCards[index].cardImage = imageUrl;
        setCards(updatedCards);
        setErrorMessage('');
      } catch (error) {
        setErrorMessage('Error al cargar la imagen. Inténtalo de nuevo.');
      }
    } else {
      setErrorMessage('Solo se permiten imágenes JPEG o PNG de hasta 20MB.');
    }
  };

  const addNewCard = () => {
    if (cards.length < MAX_CARDS) {
      setCards([...cards, { bank: 'INTERBANK', cardImage: '' }]);
      setErrorMessage('');
    } else {
      setErrorMessage(`No puedes añadir más de ${MAX_CARDS} tarjetas.`);
    }
  };

  const removeCard = (index) => {
    if (cards.length > 1) {
      const updatedCards = cards.filter((_, i) => i !== index);
      setCards(updatedCards);
      setErrorMessage('');
    } else {
      setErrorMessage('Debe quedar al menos una tarjeta.');
    }
  };

  const handleNext = () => {
    if (cards.some((card) => !card.cardImage)) {
      setErrorMessage('Debe subir una imagen para cada tarjeta.');
    } else {
      // Guardar las URLs de las tarjetas en el backend asociado al usuario
      saveCardUrls(cards);
      setErrorMessage('');
      onCompletion(cards);
      nextStep();
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-transparent min-h-screen">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-6 text-gray-800 text-center">
          Foto de tus tarjetas bancarias
        </h2>

        {cards.map((card, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-300 rounded-lg relative">
            <label className="block mb-2 text-gray-700 font-medium">
              Seleccione entidad financiera
            </label>
            <select
              value={card.bank}
              onChange={(e) => handleBankChange(index, e.target.value)}
              className="mb-4 w-full border border-gray-300 rounded-md p-2 text-gray-700"
            >
              {banks.map((bank) => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
            </select>

            <p className="text-gray-700 mb-4">
              Sube una foto de la tarjeta {card.bank} mostrando solo los últimos 4 dígitos junto con tu nombre y apellido visibles en la tarjeta.
            </p>

            <div className="relative w-full h-48 bg-gray-200 rounded-lg border border-gray-300 overflow-hidden mb-4">
              {card.cardImage ? (
                <Image src={card.cardImage} alt="Tarjeta" width={500} height={200} objectFit="contain" />
              ) : (
                <Image src="/intranet/img/card.png" alt="Ejemplo de Tarjeta" width={500} height={200} objectFit="contain" />
              )}
            </div>

            <div className="flex items-center">
              <label htmlFor={`cardImage-${index}`} className="cursor-pointer flex items-center text-blue-500">
                <FaCloudUploadAlt className="text-2xl mr-2" />
                <span className="underline">Añadir archivo</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(index, e)}
                className="hidden"
                id={`cardImage-${index}`}
              />
              {cards.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCard(index)}
                  className="ml-auto text-red-500"
                  aria-label="Eliminar tarjeta"
                >
                  <FaTrashAlt className="text-xl" />
                </button>
              )}
            </div>
          </div>
        ))}

        {errorMessage && (
          <p className="text-red-500 mb-4 text-center text-sm">{errorMessage}</p>
        )}

        <button
          type="button"
          onClick={addNewCard}
          className="w-full py-2 mb-4 text-blue-600 underline text-sm"
          disabled={cards.length >= MAX_CARDS}
        >
          Añadir si tiene otra tarjeta de otro banco
        </button>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Regresar
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
