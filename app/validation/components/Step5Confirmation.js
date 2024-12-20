"use client";

import { FaCheckCircle } from 'react-icons/fa';
import Image from "next/legacy/image";

export default function Step5Confirmation({ restart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-transparent-50">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-lg">
        {/* Icono de confirmación */}
        <div className="flex justify-center mb-4">
          <FaCheckCircle className="text-green-500 text-6xl" aria-hidden="true" />
          <span className="sr-only">Confirmación exitosa</span> {/* Descripción para accesibilidad */}
        </div>

        {/* Mensaje de confirmación */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          ¡Ya está por finalizar!
        </h2>
        <p className="text-gray-600 mb-8">
          Estamos terminando la validación de tu información. Pronto recibirás un correo de confirmación, ¡en solo 30 minutos!
        </p>

        {/* Imagen de confirmación optimizada */}
        <div className="flex justify-center mb-8">
          <Image
            src="/intranet/img/confirmation.svg"
            alt="Ilustración de confirmación"
            width={192} // Ajusta el ancho (por ejemplo, 192px para 48 * 4)
            height={192} // Ajusta la altura según sea necesario
            priority // Precarga esta imagen para que aparezca de inmediato
          />
        </div>

        {/* Botón para volver al inicio */}
        <button
          onClick={restart}
          className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-lg font-semibold"
          aria-label="Volver al inicio"
        >
          Ir al inicio
        </button>
      </div>
    </div>
  );
}