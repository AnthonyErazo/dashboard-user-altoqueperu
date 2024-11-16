"use client";

import { useState, useEffect } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import Image from "next/legacy/image";

export default function MyInfo() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="p-6 
    min-h-screen">
      <div className="bg-white shadow-md rounded-lg mx-auto max-w-6xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Datos Personales</h2>
          <span className="text-gray-500">{currentDate}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Nombres(*)</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-md p-3 focus:ring-indigo-500 focus:border-indigo-500 text-base"
              placeholder="Ingresa tus nombres"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Apellidos(*)</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-md p-3 focus:ring-indigo-500 focus:border-indigo-500 text-base"
              placeholder="Ingresa tus apellidos"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-lg font-medium text-gray-700 mb-2">E-Mail(*)</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-md p-3 focus:ring-indigo-500 focus:border-indigo-500 text-base"
              placeholder="Ingresa tu email"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-lg font-medium text-gray-700 mb-2">Teléfono(*)</label>
            <input
              type="tel"
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-md p-3 focus:ring-indigo-500 focus:border-indigo-500 text-base"
              placeholder="Ingresa tu teléfono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Tipo de Documento(*)</label>
            <input
              type="text"
              value="DNI"
              disabled
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-100 shadow-md p-3 text-base"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">N° Documento(*)</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-md p-3 focus:ring-indigo-500 focus:border-indigo-500 text-base"
              placeholder="Ingresa tu número de documento"
            />
          </div>
        </div>
      </div>

      <DocumentUpload />
    </div>
  );
}

function DocumentUpload() {
  const [files] = useState([
    {
      name: "DNI_anverso.jpg",
      size: "56.2 KB",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      name: "DNI_reverso.jpg",
      size: "58.4 KB",
      imageUrl: "https://via.placeholder.com/150",
    },
  ]);

  return (
    <div className="mt-8">
      <div className="bg-white shadow-md rounded-lg mx-auto max-w-6xl p-6">
        <h3 className="text-xl font-semibold mb-4">Documento de Identidad (*)</h3>

        <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-200 rounded-md mb-6">
          <FaInfoCircle className="text-blue-500" />
          <p className="text-sm text-blue-600">
            Imágenes del anverso y reverso del DNI, en formato jpg/jpeg con un peso menor a 500Kb.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {files.map((file, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-lg overflow-hidden shadow-md">
              <Image
                src={file.imageUrl}
                alt={file.name}
                width={300}
                height={200}
                className="w-full h-auto object-contain"
              />
              <div className="p-4">
                <h4 className="font-medium text-sm truncate">{file.name}</h4>
                <p className="text-xs text-gray-500">{file.size}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
