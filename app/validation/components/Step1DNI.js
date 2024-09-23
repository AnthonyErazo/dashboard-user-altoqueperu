"use client";

import { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

const MAX_SIZE_MB = 5;

const isValidFile = (file) => {
  const validTypes = ['image/jpeg', 'image/png'];
  const isValidType = validTypes.includes(file.type);
  const isValidSize = file.size <= MAX_SIZE_MB * 1024 * 1024; // Convertir MB a bytes
  return isValidType && isValidSize;
};

export default function Step1DNI({ nextStep, onCompletion, initialData }) {
  const [dniFront, setDniFront] = useState(initialData.dniFront || '');
  const [dniBack, setDniBack] = useState(initialData.dniBack || '');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (setDni) => (e) => {
    const file = e.target.files[0];
    if (file) {
      if (isValidFile(file)) {
        setDni(URL.createObjectURL(file));
        setErrorMessage(''); // Limpiar mensaje de error
      } else {
        setErrorMessage('Solo se permiten imágenes JPEG o PNG de hasta 5MB.');
      }
    }
  };

  const handleNext = () => {
    if (dniFront && dniBack) {
      onCompletion({ dniFront, dniBack });
      nextStep();
    } else {
      setErrorMessage('Debe subir ambas fotos del DNI: frontal y posterior.');
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Sube las fotos de tu DNI</h2>
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-8">
        {/* Sección para la foto frontal */}
        <div className="flex-1 bg-white p-6 rounded-lg border border-gray-300 shadow-md">
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-medium text-gray-700">Foto del lado frontal</h3>
          </div>
          <div className="flex items-center mb-4">
            <p className="text-gray-600 text-sm">Adjunta aquí la imagen del lado frontal de tu DNI.</p>
            <label htmlFor="dniFront" className="cursor-pointer ml-4 flex items-center">
              <FaCloudUploadAlt className="text-2xl text-blue-500" />
            </label>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange(setDniFront)}
            className="hidden"
            id="dniFront"
          />
          <div className="relative w-full h-64 bg-gray-200 rounded-lg border border-gray-300 overflow-hidden">
            {dniFront ? (
              <img src={dniFront} alt="DNI Front" className="w-full h-full object-cover" />
            ) : (
              <img src="https://via.placeholder.com/400x250?text=Foto+Frontal" alt="DNI Frontal Example" className="w-full h-full object-cover" />
            )}
          </div>
        </div>

        {/* Sección para la foto posterior */}
        <div className="flex-1 bg-white p-6 rounded-lg border border-gray-300 shadow-md">
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-medium text-gray-700">Foto del lado posterior</h3>
          </div>
          <div className="flex items-center mb-4">
            <p className="text-gray-600 text-sm">Adjunta aquí la imagen del lado posterior de tu DNI.</p>
            <label htmlFor="dniBack" className="cursor-pointer ml-4 flex items-center">
              <FaCloudUploadAlt className="text-2xl text-blue-500" />
            </label>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange(setDniBack)}
            className="hidden"
            id="dniBack"
          />
          <div className="relative w-full h-64 bg-gray-200 rounded-lg border border-gray-300 overflow-hidden">
            {dniBack ? (
              <img src={dniBack} alt="DNI Back" className="w-full h-full object-cover" />
            ) : (
              <img src="https://via.placeholder.com/400x250?text=Foto+Posterior" alt="DNI Posterior Example" className="w-full h-full object-cover" />
            )}
          </div>
        </div>
      </div>
      {errorMessage && <p className="text-red-500 mt-4 text-center text-sm">{errorMessage}</p>}
      <button
        onClick={handleNext}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
      >
        Siguiente
      </button>
    </div>
  );
}