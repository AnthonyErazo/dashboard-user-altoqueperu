"use client";

import { useState, useEffect } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Image from 'next/image';

const MAX_SIZE_MB = 20;

const isValidFileType = (file) => {
  const validTypes = ['image/jpeg', 'image/png'];
  return validTypes.includes(file.type) && file.size <= MAX_SIZE_MB * 1024 * 1024;
};

// Convertir archivo a Base64
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// Código para enviar la imagen a WordPress
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

// Guardar la imagen de perfil con DNI en los metadatos del usuario en WordPress
const saveProfileImageToServer = async (imageUrl) => {
  try {
    const formData = new FormData();
    formData.append("action", "altoke_guardar_perfil_dni");
    formData.append("profileDNIUrl", imageUrl); // Enviar la URL de la imagen al backend

    const response = await fetch("https://altoqueperuwk.com/wp-admin/admin-ajax.php", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const result = await response.json();

    if (result.success) {
      console.log("Imagen de perfil con DNI guardada correctamente");
    } else {
      console.error("Error al guardar la imagen: ", result.data.message);
    }
  } catch (error) {
    console.error("Error en la solicitud AJAX: ", error);
  }
};

export default function Step2Profile({ nextStep, prevStep, onCompletion, initialData }) {
  const [profileDNI, setProfileDNI] = useState(initialData?.profileDNI || '');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const savedProfileDNI = localStorage.getItem('profileDNI');
    if (savedProfileDNI) setProfileDNI(savedProfileDNI);
    else if (initialData?.profileDNI) setProfileDNI(initialData.profileDNI);
  }, [initialData]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!isValidFileType(file)) {
        setErrorMessage('Solo se permiten imágenes JPEG o PNG de hasta 20MB.');
        return;
      }
      try {
        const base64Image = await toBase64(file);
        setProfileDNI(base64Image);
        localStorage.setItem('profileDNI', base64Image);
        setErrorMessage('');

        // Enviar la imagen al servidor y obtener la URL
        const imageUrl = await uploadImageToServer(file);
        if (imageUrl) {
          setProfileDNI(imageUrl); // Guardar la URL de la imagen cargada
          // Guardar la URL de la imagen en el backend (WordPress)
          await saveProfileImageToServer(imageUrl);
        }
      } catch {
        setErrorMessage('Error al procesar la imagen. Inténtalo de nuevo.');
      }
    }
  };

  const handleNext = () => {
    if (!profileDNI) {
      setErrorMessage('Por favor, sube una foto de perfil con tu DNI en mano.');
      return;
    }
    onCompletion({ profileDNI });
    nextStep();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-transparent">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Foto de perfil con DNI
        </h2>
        <div className="flex items-center justify-center mb-4">
          <p className="text-gray-600 text-center mr-2">
            Adjunta aquí la foto de perfil mostrando tu DNI en mano.
          </p>
          <label htmlFor="profileDNI" className="cursor-pointer flex items-center">
            <FaCloudUploadAlt className="text-3xl text-blue-500" />
            <span className="sr-only">Subir foto de perfil con DNI</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="profileDNI"
            aria-describedby="profileDNI-description"
          />
          <span id="profileDNI-description" className="sr-only">
            Cargue una foto de perfil con su DNI en mano
          </span>
        </div>

        <div className="w-full h-64 bg-gray-200 rounded-lg border border-gray-300 overflow-hidden mb-4 relative">
          {profileDNI ? (
            <Image
              src={profileDNI}
              alt="Foto de perfil con DNI"
              fill
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <Image
              src="/intranet/img/selfie-dni.jpg"
              alt="Ejemplo de foto de perfil con DNI"
              fill
              style={{ objectFit: 'contain' }}
            />
          )}
        </div>

        {errorMessage && (
          <p className="text-red-500 mt-4 text-center text-sm">{errorMessage}</p>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={prevStep}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            aria-label="Regresar al paso anterior"
          >
            Regresar
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="Ir al siguiente paso"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
