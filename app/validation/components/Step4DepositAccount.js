"use client";

import { useState } from 'react';
import { FaTrash, FaPlus, FaUniversity, FaExclamationCircle } from 'react-icons/fa';

export default function Step4DepositAccount({ finish, prevStep, onCompletion }) {
  const banks = [
    { name: "BCP", digits: 14 },
    { name: "INTERBANK", digits: 13 },
    { name: "BBVA", digits: 18 },
    { name: "SCOTIABANK", digits: 10 },
    { name: "BANBIF", digits: 12 },
  ];

  const [accounts, setAccounts] = useState([{ bank: '', accountNumber: '', accountHolder: '' }]);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleBankChange = (index, value) => {
    const updatedAccounts = [...accounts];
    updatedAccounts[index].bank = value;
    updatedAccounts[index].accountNumber = ''; // Clear account number on bank change
    setAccounts(updatedAccounts);
    setErrorMessages([]);
  };

  const handleAccountNumberChange = (index, value) => {
    const updatedAccounts = [...accounts];
    const selectedBank = banks.find(bank => bank.name === updatedAccounts[index].bank);
    if (/^\d*$/.test(value) && (!selectedBank || value.length <= selectedBank.digits)) {
      updatedAccounts[index].accountNumber = value;
      setErrorMessages([]);
    } else {
      setErrorMessages(prev => ({ ...prev, [index]: `El número de cuenta debe contener solo dígitos y un máximo de ${selectedBank?.digits || ''} dígitos.` }));
    }
    setAccounts(updatedAccounts);
  };

  const handleAccountHolderChange = (index, value) => {
    const updatedAccounts = [...accounts];
    if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
      updatedAccounts[index].accountHolder = value;
      setErrorMessages([]);
    } else {
      setErrorMessages(prev => ({ ...prev, [index]: 'El nombre del titular solo debe contener letras.' }));
    }
    setAccounts(updatedAccounts);
  };

  const addAccount = () => {
    if (accounts.length < 5) {
      setAccounts([...accounts, { bank: '', accountNumber: '', accountHolder: '' }]);
      setErrorMessages([]);
    } else {
      setErrorMessages(["No puedes añadir más de 5 cuentas."]);
    }
  };

  const removeAccount = (index) => {
    if (accounts.length > 1) {
      const updatedAccounts = accounts.filter((_, i) => i !== index);
      setAccounts(updatedAccounts);
      setErrorMessages([]);
    } else {
      setErrorMessages(["Debe quedar al menos una cuenta."]);
    }
  };

  const handleFinish = () => {
    let hasErrors = false;
    let newErrorMessages = [];

    accounts.forEach((account, index) => {
      const bank = banks.find(b => b.name === account.bank);

      if (!account.bank) {
        newErrorMessages[index] = "Por favor, seleccione el banco.";
        hasErrors = true;
      } else if (!account.accountNumber) {
        newErrorMessages[index] = "Por favor, ingrese el número de cuenta.";
        hasErrors = true;
      } else if (bank && account.accountNumber.length !== bank.digits) {
        newErrorMessages[index] = `El número de cuenta debe tener exactamente ${bank.digits} dígitos.`;
        hasErrors = true;
      } else if (!account.accountHolder) {
        newErrorMessages[index] = "Por favor, ingrese el nombre del titular.";
        hasErrors = true;
      }
    });

    // Verificación de duplicados
    const accountNumbers = accounts.map(account => account.accountNumber);
    const hasDuplicates = accountNumbers.some((number, index) => accountNumbers.indexOf(number) !== index);
    if (hasDuplicates) {
      newErrorMessages.push("Hay números de cuenta duplicados. Cada cuenta debe ser única.");
      hasErrors = true;
    }

    if (hasErrors) {
      setErrorMessages(newErrorMessages);
    } else {
      setErrorMessages([]);
      onCompletion(accounts);
      finish();
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-transparent min-h-screen">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-6 text-gray-800 text-center">
          Ingrese sus cuentas de ahorro para recibir el depósito
        </h2>
        <p className="text-gray-600 mb-4 text-sm text-center">
          <strong>* IMPORTANTE:</strong> Debe ser TITULAR de todas las cuentas de ahorro.
        </p>

        {accounts.map((account, index) => (
          <div key={index} className="mb-6 border-b pb-4 relative">
            <div className="flex items-center mb-4">
              <FaUniversity className="text-blue-500 text-lg mr-2" />
              <label className="block text-gray-700 font-medium">Seleccione entidad financiera</label>
            </div>
            <select
              value={account.bank}
              onChange={(e) => handleBankChange(index, e.target.value)}
              className="mb-4 w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none"
            >
              <option value="">Seleccione banco</option>
              {banks.map(bank => (
                <option key={bank.name} value={bank.name}>{bank.name} ({bank.digits} dígitos)</option>
              ))}
            </select>

            <label className="block mb-2 text-gray-700 font-medium">Número de cuenta</label>
            <input
              type="text"
              value={account.accountNumber}
              onChange={(e) => handleAccountNumberChange(index, e.target.value)}
              className="mb-2 w-full border border-gray-300 rounded-md p-2 text-gray-700"
              placeholder={`Número de cuenta (${banks.find(b => b.name === account.bank)?.digits || ''} dígitos)`}
            />
            {errorMessages[index] && errorMessages[index].includes("cuenta") && (
              <p className="text-red-500 text-xs flex items-center"><FaExclamationCircle className="mr-1" />{errorMessages[index]}</p>
            )}

            <label className="block mt-4 mb-2 text-gray-700 font-medium">Nombre del titular</label>
            <input
              type="text"
              value={account.accountHolder}
              onChange={(e) => handleAccountHolderChange(index, e.target.value)}
              className="mb-2 w-full border border-gray-300 rounded-md p-2 text-gray-700"
              placeholder="Nombre del titular"
            />
            {errorMessages[index] && errorMessages[index].includes("titular") && (
              <p className="text-red-500 text-xs flex items-center"><FaExclamationCircle className="mr-1" />{errorMessages[index]}</p>
            )}

            {accounts.length > 1 && (
              <button
                type="button"
                onClick={() => removeAccount(index)}
                className="absolute top-0 right-0 text-red-600 hover:text-red-800 transition-colors"
                title="Eliminar esta cuenta"
              >
                <FaTrash className="text-xl" />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addAccount}
          className="flex items-center text-blue-600 text-sm underline mb-6"
        >
          <FaPlus className="mr-2" /> Añadir otra cuenta
        </button>

        {errorMessages.length > 0 && typeof errorMessages === "string" && (
          <p className="text-red-500 mb-4 text-center text-sm flex items-center">
            <FaExclamationCircle className="mr-1" /> {errorMessages}
          </p>
        )}

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Regresar
          </button>
          <button
            type="button"
            onClick={handleFinish}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
}