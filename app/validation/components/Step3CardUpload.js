"use client";

import { useState, useEffect } from 'react';
import { FaCloudUploadAlt, FaTrashAlt } from 'react-icons/fa';
import Image from "next/legacy/image";

const MAX_SIZE_MB = 20;
const MAX_CARDS = 20;
const banks = ['INTERBANK', 'BCP', 'BBVA', 'BanBif', 'Scotiabank'];

const isValidFileType = (file) => {
  const validTypes = ['image/jpeg', 'image/png'];
  return validTypes.includes(file.type) && file.size <= MAX_SIZE_MB * 1024 * 1024;
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

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file && isValidFileType(file)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Image = reader.result;

        // Evitar duplicados de imagen
        if (cards.some((card) => card.cardImage === base64Image)) {
          setErrorMessage('Esta imagen ya ha sido subida. Por favor, selecciona otra.');
        } else {
          const updatedCards = [...cards];
          updatedCards[index].cardImage = base64Image;
          setCards(updatedCards);
          setErrorMessage('');
        }
      };
      reader.onerror = () => {
        setErrorMessage('Error al cargar la imagen. Inténtalo de nuevo.');
      };
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