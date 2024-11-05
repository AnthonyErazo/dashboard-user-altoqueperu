import React from 'react';

// Componente StepIndicator con propiedades mejoradas para accesibilidad y estilo
const StepIndicator = ({ currentStep, onStepClick }) => {
  const steps = [
    { number: 1, label: "DNI" },
    { number: 2, label: "Perfil" },
    { number: 3, label: "Tarjeta" },
    { number: 4, label: "Cuenta" },
    { number: 5, label: "Confirmación" }
  ];

  return (
    <div className="flex justify-center space-x-6 mb-12">
      {steps.map(({ number, label }) => (
        <div
          key={number}
          className="flex flex-col items-center relative group"
          onClick={() => onStepClick(number)}
          role="button"
          aria-label={`Paso ${number}: ${label}`}
          tabIndex={0} // Para hacer que cada paso sea seleccionable con el teclado
          onKeyPress={(e) => e.key === 'Enter' && onStepClick(number)} // Soporte de teclado
        >
          <div
            className={`w-10 h-10 flex items-center justify-center text-base font-semibold rounded-full cursor-pointer transition-all duration-300 ${
              currentStep === number
                ? 'bg-blue-600 text-white border-4 border-blue-600' // Paso actual
                : currentStep > number
                ? 'bg-blue-300 text-white border-4 border-blue-300' // Pasos completados
                : 'bg-gray-200 text-gray-600 border-2 border-gray-300' // Pasos futuros
            }`}
            style={{
              boxShadow: currentStep === number ? '0 4px 10px rgba(0, 0, 0, 0.2)' : 'none',
            }}
          >
            {number}
          </div>

          {/* Tooltip de descripción para cada paso */}
          <span className="absolute top-12 transform -translate-x-1/2 left-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;