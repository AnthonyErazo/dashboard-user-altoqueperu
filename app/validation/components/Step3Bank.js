"use client";

import { useState } from 'react';

const banks = ['BCP', 'BBVA', 'Interbank', 'Scotiabank', 'BanBif'];

export default function Step3Bank({ finish, prevStep }) {
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [alias, setAlias] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Reglas de validación de número de cuenta por banco
  const accountValidationRules = {
    'BCP': 11,
    'BBVA': 18,
    'Interbank': 13,
    'Scotiabank': 12,
    'BanBif': 10
  };

  const validateAccountNumber = () => {
    if (!selectedBank || !accountNumber) return false;
    const requiredLength = accountValidationRules[selectedBank];
    return accountNumber.length === requiredLength;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBank) {
      setErrorMessage('Seleccione una entidad financiera.');
    } else if (!accountNumber) {
      setErrorMessage('Ingrese el número de cuenta.');
    } else if (!validateAccountNumber()) {
      setErrorMessage(`El número de cuenta debe tener ${accountValidationRules[selectedBank]} dígitos para ${selectedBank}.`);
    } else if (!alias) {
      setErrorMessage('Ingrese un alias para la cuenta.');
    } else {
      setErrorMessage(''); // Limpiar mensaje de error
      finish(); // Avanzar al siguiente paso si todo es correcto
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ingrese cuenta bancaria</h2>
      <form onSubmit={handleSubmit}>
        {/* Selección de entidad financiera */}
        <label className="block mb-2 text-gray-700">Seleccione entidad financiera</label>
        <select
          value={selectedBank}
          onChange={(e) => setSelectedBank(e.target.value)}
          className="mb-4 w-full border border-gray-300 rounded-md p-2 text-gray-700"
        >
          <option value="">Seleccione una opción</option>
          {banks.map(bank => (
            <option key={bank} value={bank}>{bank}</option>
          ))}
        </select>

        {/* Número de cuenta */}
        <label className="block mb-2 text-gray-700">Número de cuenta</label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="mb-4 w-full border border-gray-300 rounded-md p-2 text-gray-700"
          placeholder={`Ingrese ${selectedBank ? `el número de cuenta para ${selectedBank}` : 'número de cuenta'}`}
        />
        {/* Mensaje de ayuda sobre la longitud requerida */}
        {selectedBank && (
          <p className="text-sm text-gray-600 mb-2">
            El número de cuenta para {selectedBank} debe tener {accountValidationRules[selectedBank]} dígitos.
          </p>
        )}

        {/* Alias de cuenta */}
        <label className="block mb-2 text-gray-700">Alias de cuenta</label>
        <input
          type="text"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          className="mb-4 w-full border border-gray-300 rounded-md p-2 text-gray-700"
          placeholder="Ingresa un alias para tu cuenta"
        />

        {/* Mensajes de error */}
        {errorMessage && <p className="text-red-500 mb-4 text-sm">{errorMessage}</p>}

        {/* Botones de navegación */}
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Regresar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Finalizar
          </button>
        </div>
      </form>
    </div>
  );
}