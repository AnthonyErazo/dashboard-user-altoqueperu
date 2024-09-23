"use client";

export default function Step4Confirmation({ restart }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 text-center">
      <div className="mb-4">
        {/* Icono de confirmación */}
        <svg
          className="mx-auto mb-4 w-16 h-16 text-green-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m0 0a9 9 0 11-6-6 9 9 0 016 6z"
          />
        </svg>
      </div>

      {/* Mensaje de éxito */}
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">¡Registro Completado!</h2>
      <p className="text-gray-600 mb-6">Tus datos han sido registrados correctamente.</p>

      {/* Botón para volver al inicio o reiniciar */}
      <button
        onClick={restart}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Volver al Inicio
      </button>
    </div>
  );
}