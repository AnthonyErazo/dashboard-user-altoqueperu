"use client";

import { useState, useEffect } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Image from 'next/image';

const MAX_SIZE_MB = 20;

const isValidFile = (file) => {
  const validTypes = ['image/jpeg', 'image/png'];
  return validTypes.includes(file.type) && file.size <= MAX_SIZE_MB * 1024 * 1024;
};

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function Step1DNI({ nextStep, onCompletion, initialData }) {
  const [dniFront, setDniFront] = useState(initialData.dniFront || '');
  const [dniBack, setDniBack] = useState(initialData.dniBack || '');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const savedDniFront = localStorage.getItem('dniFront');
    const savedDniBack = localStorage.getItem('dniBack');
    if (savedDniFront) setDniFront(savedDniFront);
    if (savedDniBack) setDniBack(savedDniBack);
  }, []);

  const handleFileChange = (setDni, storageKey) => async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (isValidFile(file)) {
        const base64Image = await toBase64(file);
        setDni(base64Image);
        localStorage.setItem(storageKey, base64Image);
        setErrorMessage('');
      } else {
        setErrorMessage('Solo se permiten imágenes JPEG o PNG de hasta 20MB.');
      }
    }
  };

  const handleNext = () => {
    if (!dniFront || !dniBack) {
      setErrorMessage('Debe subir ambas fotos del DNI: frontal y posterior.');
      return;
    }
    onCompletion({ dniFront, dniBack });
    nextStep();
  };

  return (
    <div className="flex flex-col items-center p-8 bg-transparent-50 min-h-screen">
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
        Sube las fotos de tu DNI
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
        {/* Foto Frontal */}
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300">
          <h3 className="text-xl font-medium text-gray-700 mb-4">
            Foto del lado frontal
          </h3>
          <div className="flex items-center mb-6">
            <p className="text-gray-600 text-sm mr-2">
              Adjunta aquí la imagen del lado frontal de tu DNI.
            </p>
            <label htmlFor="dniFront" className="cursor-pointer">
              <FaCloudUploadAlt className="text-3xl text-blue-500" />
            </label>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange(setDniFront, 'dniFront')}
            className="hidden"
            id="dniFront"
            aria-describedby="dniFrontDescription"
          />
          <span id="dniFrontDescription" className="sr-only">
            Sube la imagen del lado frontal de tu DNI
          </span>
          <div className="w-full h-64 bg-gray-200 rounded-lg border overflow-hidden relative">
            {dniFront ? (
              <Image src={dniFront} alt="DNI Frontal" fill style={{ objectFit: 'contain' }} />
            ) : (
              <Image
                src="/img/dni-frontal.jpg"
                alt="Ejemplo de DNI Frontal"
                fill
                style={{ objectFit: 'contain' }}
              />
            )}
          </div>
        </div>

        {/* Foto Posterior */}
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300">
          <h3 className="text-xl font-medium text-gray-700 mb-4">
            Foto del lado posterior
          </h3>
          <div className="flex items-center mb-6">
            <p className="text-gray-600 text-sm mr-2">
              Adjunta aquí la imagen del lado posterior de tu DNI.
            </p>
            <label htmlFor="dniBack" className="cursor-pointer">
              <FaCloudUploadAlt className="text-3xl text-blue-500" />
            </label>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange(setDniBack, 'dniBack')}
            className="hidden"
            id="dniBack"
            aria-describedby="dniBackDescription"
          />
          <span id="dniBackDescription" className="sr-only">
            Sube la imagen del lado posterior de tu DNI
          </span>
          <div className="w-full h-64 bg-gray-200 rounded-lg border overflow-hidden relative">
            {dniBack ? (
              <Image src={dniBack} alt="DNI Posterior" fill style={{ objectFit: 'contain' }} />
            ) : (
              <Image
                src="/img/dni-reverso.jpg"
                alt="Ejemplo de DNI Posterior"
                fill
                style={{ objectFit: 'contain' }}
              />
            )}
          </div>
        </div>
      </div>

      {errorMessage && (
        <p className="text-red-500 mt-4 text-center text-sm">{errorMessage}</p>
      )}

      <button
        onClick={handleNext}
        disabled={!dniFront || !dniBack}
        className={`mt-8 px-10 py-4 rounded-lg text-white font-semibold transition-colors ${
          dniFront && dniBack
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
        aria-label="Siguiente paso"
      >
        Siguiente
      </button>
    </div>
  );
}