import React from 'react';

// Propiedades del componente StepIndicator
const StepIndicator = ({  currentStep, onStepClick }) => {
  const steps = [1, 2, 3];
  
  return (
    <div className="flex justify-center space-x-4 mb-8">
      {steps.map((stepNumber) => (
        <div
          key={stepNumber}
          onClick={() => onStepClick(stepNumber)}
          className={`w-12 h-12 flex items-center justify-center text-lg font-semibold rounded-full cursor-pointer transition-all duration-300 ${
            currentStep >= stepNumber
              ? 'border-blue-600 bg-blue-600 text-white border-4'
              : 'border-gray-300 text-gray-600 border-2'
          }`}
          style={{ boxShadow: currentStep >= stepNumber ? '0 0 10px rgba(0, 0, 0, 0.2)' : 'none' }}
        >
          {stepNumber}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;