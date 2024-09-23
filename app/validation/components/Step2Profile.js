"use client";

import { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

export default function Step2Profile({ nextStep, prevStep, onCompletion, initialData }) {
  const [profileDNI, setProfileDNI] = useState(initialData.profileDNI || '');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileDNI(URL.createObjectURL(file));
      setErrorMessage(''); // Limpiar mensaje de error al seleccionar una imagen válida
    }
  };

  const handleNext = () => {
    if (profileDNI) {
      onCompletion({ profileDNI });
      nextStep();
    } else {
      setErrorMessage('Por favor, sube una foto de perfil con tu DNI en mano.');
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Sube una foto de perfil con tu DNI en mano</h2>

      {/* Caja de carga de imagen similar al Paso 1 */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-8">
        <div className="flex-1 bg-white p-6 rounded-lg border border-gray-300 shadow-md">
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-medium text-gray-700">Foto de perfil con DNI</h3>
          </div>
          <div className="flex items-center mb-4">
            <p className="text-gray-600 text-sm">Adjunta aquí tu foto de perfil mostrando tu DNI en mano.</p>
            <label htmlFor="profileDNI" className="cursor-pointer ml-4 flex items-center">
              <FaCloudUploadAlt className="text-2xl text-blue-500" />
            </label>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="profileDNI"
          />
          <div className="relative w-full h-64 bg-gray-200 rounded-lg border border-gray-300 overflow-hidden">
            {profileDNI ? (
              <img src={profileDNI} alt="Profile with DNI" className="w-full h-full object-cover" />
            ) : (
              <img src="https://via.placeholder.com/400x250?text=Foto+Perfil" alt="Profile Example" className="w-full h-full object-cover" />
            )}
          </div>
        </div>
      </div>

      {/* Mensaje de error */}
      {errorMessage && <p className="text-red-500 mt-4 text-center text-sm">{errorMessage}</p>}

      {/* Botones de navegación */}
      <div className="mt-6 flex justify-between w-full max-w-xl">
        <button
          onClick={prevStep}
          className="px-6 py-3 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-colors"
        >
          Regresar
        </button>

        <button
          onClick={handleNext}
          className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}