"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TiTick } from "react-icons/ti";
import { FaMoneyBillWave, FaPercent, FaPiggyBank } from "react-icons/fa";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";

const banks = [
  { label: "BCP", image: "/assets/BCP.jpg" },
  { label: "Scotiabank", image: "/assets/Scotiabank.jpg" },
  { label: "BanBif",  image: "/assets/BanBif.jpg" },
  { label: "BBVA", image: "/assets/BBVA.jpg" },
  { label: "Interbank", image: "/assets/Interbank.jpg" },
];
interface Bank {
  label: string;
  image: string;
}

export default function Home() {
  const [amountSent, setAmountSent] = useState(0);
  const [amountReceived, setAmountReceived] = useState(0);
  const [selectedBank, setSelectedBank] = useState<Bank>(banks[0]);
  const [promoCode, setPromoCode] = useState('');
  const [commission, setCommission] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Cotiza", "Cuentas", "Transfiere"];

  useEffect(() => {
    handleDiscount(); // Se actualiza automáticamente el cálculo cuando cambia amountSent
  }, [amountSent, promoCode, selectedBank]);

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Calcula los descuentos y comisiones
  const handleDiscount = () => {
    let commissionAmount = 0;
    let receivedAmount = 0;

    if (["Beto25", "Luis25", "Jack25", "Richi25"].includes(promoCode) && selectedBank) {
      if (["BCP", "Interbank", "BBVA"].includes(selectedBank.label)) {
        commissionAmount = amountSent > 4000 ? amountSent * 0.0025 : 10;
      } else if (["Scotiabank", "BanBif"].includes(selectedBank.label)) {
        commissionAmount = amountSent > 3500 ? amountSent * 0.0035 : 12;
      }
    } else if (promoCode === 'Jonathan30' && selectedBank) {
      if (["BCP", "Interbank", "BBVA"].includes(selectedBank.label)) {
        commissionAmount = amountSent > 4000 ? amountSent * 0.003 : 10;
      } else if (["Scotiabank", "BanBif"].includes(selectedBank.label)) {
        commissionAmount = amountSent > 3500 ? amountSent * 0.004 : 12;
      }
    } else {
      commissionAmount = amountSent > 2000 ? amountSent * 0.005 : 10;
    }

    receivedAmount = amountSent - commissionAmount;
    setAmountReceived(receivedAmount);
    setCommission(commissionAmount);
  };

  // Maneja los cambios en el monto enviado
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setAmountSent(value);
  };

  // Maneja la selección del banco
  const handleBankSelect = (event: SelectChangeEvent<string>) => {
    const selectedLabel = event.target.value;
    const newValue = banks.find((bank) => bank.label === selectedLabel);
    if (newValue) {
      setSelectedBank(newValue);
    }
  };

  return (
    <div className="h-[100vh] flex flex-col justify-between">
      <div className="flex justify-around py-8 text-gray-700">
        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0, translateX: -30 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="outlined"
            color="secondary"
            disabled={currentStep === 1}
            onClick={handlePrev}
          >
            Anterior
          </Button>
        </motion.div>
        <div className="flex text-gray-700">
          {steps?.map((step, i) => (
            <div key={i} className="mx-4 flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: currentStep === i + 1 ? 1.2 : 1 }}
                transition={{ duration: 0.5 }}
                className={`flex items-center justify-center w-12 h-12 rounded-full ${currentStep === i + 1 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"}`}
              >
                {i + 1 < currentStep ? <TiTick size={24} /> : i + 1}
              </motion.div>
              <p className="mt-2 text-sm">{step}</p>
            </div>
          ))}
        </div>
        <motion.div
          className="flex justify-between items-center text-gray-800"
          initial={{ opacity: 0, translateX: 30 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={currentStep === steps.length}
          >
            {currentStep === steps.length ? "Finalizar" : "Siguiente"}
          </Button>
        </motion.div>
      </div>

      <motion.div
        key={currentStep}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center h-full w-full px-4"
      >
        <div className="flex flex-col justify-between">

          {currentStep === 1 && (
            <div className="flex flex-col md:flex-row justify-between p-6 gap-6">
              <motion.div
                className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, translateX: -30 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Cotiza el tipo de cambio</h2>
                <FormControl className="relative mb-6" fullWidth>
                  <InputLabel htmlFor="envias">ENVIAS</InputLabel>
                  <OutlinedInput
                    id="envias"
                    startAdornment={<InputAdornment position="start">S/.</InputAdornment>}
                    value={amountSent}
                    onChange={handleAmountChange}
                    label="ENVIAS"
                  />
                  <div className="absolute top-[30%] right-5">
                    <FaMoneyBillWave size={22} className="text-gray-500" />
                  </div>
                </FormControl>
                <FormControl className="relative mb-6" fullWidth>
                  <InputLabel htmlFor="recibes">RECIBES</InputLabel>
                  <OutlinedInput
                    id="recibes"
                    startAdornment={<InputAdornment position="start">S/.</InputAdornment>}
                    value={amountReceived.toFixed(2)}
                    disabled
                    label="RECIBES"
                  />
                  <div className="absolute top-[30%] right-5">
                    <FaPiggyBank size={22} className="text-gray-500" />
                  </div>
                </FormControl>
                <TextField
                  label="Código Promocional"
                  variant="outlined"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  fullWidth
                  className="mb-6"
                />
                <FormControl className="relative mb-6" fullWidth>
                  <Select
                    value={selectedBank.label}
                    onChange={handleBankSelect}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {banks.map((bank) => {
                      return <MenuItem value={bank.label}>{bank.label}</MenuItem>
                    })}
                  </Select>
                </FormControl>
              </motion.div>
              <motion.div
                className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, translateX: 30 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h6" gutterBottom>
                  Detalles del Banco y Comisión
                </Typography>

                {selectedBank ? (
                  <Box>
                    <Typography variant="body1" className="mb-4">
                      Banco Seleccionado: <strong>{selectedBank.label}</strong>
                    </Typography>

                    <Box display="flex" alignItems="center" className="mb-4">
                      <FaPercent size={20} className="mr-2 text-gray-500" />
                      <Typography variant="body1">
                        Comisión: <strong>S/. {commission.toFixed(2)}</strong>
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" className="mb-4">
                      <FaMoneyBillWave size={20} className="mr-2 text-gray-500" />
                      <Typography variant="body1">
                        Total a recibir después de la comisión: <strong>S/. {amountReceived.toFixed(2)}</strong>
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Typography variant="body1" color="textSecondary">
                    Selecciona un banco para ver los detalles.
                  </Typography>
                )}
              </motion.div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="flex flex-col md:flex-row justify-between p-6 gap-6">
              <motion.div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                <Typography variant="h6" gutterBottom>
                  Detalles de la Transferencia
                </Typography>
                {selectedBank ? (
                  <Box>
                    <Typography variant="body1" className="mb-4">
                      <strong>Banco Seleccionado:</strong> {selectedBank.label}
                    </Typography>
                    <Typography variant="body1" className="mb-4">
                      <FaPercent size={20} className="mr-2 text-gray-500" />
                      <strong>Comisión:</strong> S/. {commission.toFixed(2)}
                    </Typography>
                    <Typography variant="body1" className="mb-4">
                      <FaMoneyBillWave size={20} className="mr-2 text-gray-500" />
                      <strong>Monto a Enviar:</strong> S/. {amountSent}
                    </Typography>
                    <Typography variant="body1" className="mb-4">
                      <FaPiggyBank size={20} className="mr-2 text-gray-500" />
                      <strong>Monto a Recibir:</strong> S/. {amountReceived.toFixed(2)}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="body1" color="textSecondary">
                    Selecciona un banco para ver los detalles.
                  </Typography>
                )}
              </motion.div>
              <motion.div
                className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, translateY: 30 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h6" gutterBottom>
                  Selecciona el Banco Receptor
                </Typography>

                {/* <Autocomplete
                  value={receivingBank}
                  onChange={handleReceivingBankSelect}
                  inputValue={receivingBank ? receivingBank.label : ""}
                  disablePortal
                  options={banks}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selecciona un banco"
                      className="bg-gray-100"
                    />
                  )}
                /> */}

                {/* {receivingBank && (
                  <Box mt={4} className="bg-blue-50 p-4 rounded-lg">
                    <Typography variant="body1" className="mb-2">
                      <strong>Últimos 4 dígitos:</strong> {receivingBank.accountInfo.lastDigits}
                    </Typography>
                    <Typography variant="body1" className="mb-2">
                      <strong>Titular:</strong> {receivingBank.accountInfo.owner}
                    </Typography>
                    <Typography variant="body1" className="mb-2">
                      <strong>Moneda:</strong> {receivingBank.accountInfo.currency}
                    </Typography>
                  </Box>
                )} */}
              </motion.div>
            </div>
          )}

          {/* Step 3: Transfiere */}
          {currentStep === 3 && (
            <div className="flex flex-col xl:flex-row max-xl:items-center p-6 gap-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="xl:max-w-[55vh] max-xl:min-w-[55vh] md:w-1/2 bg-white p-6 rounded-lg shadow-lg"
              >
                <Typography variant="h6" gutterBottom className="text-gray-800 text-center">
                  Banco Seleccionado
                </Typography>
                <div className="flex justify-center items-center">
                  {selectedBank ? (
                    <Image
                      src={selectedBank.image}
                      alt={selectedBank.label}
                      width={200}
                      height={200}
                      layout="responsive"
                      className="w-full h-auto object-contain"
                    />
                  ) : (
                    <Typography variant="body1" color="textSecondary">
                      Selecciona un banco para ver la imagen.
                    </Typography>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="xl:max-w-[55vh] max-xl:min-w-[55vh] md:w-1/2 bg-white p-6 rounded-lg shadow-lg"
              >
                <Typography variant="h6" gutterBottom className="text-gray-800 text-center">
                  Sube tu Voucher
                </Typography>
                <div className="flex w-full h-[90%] flex-col">
                  <Box className="mb-6 w-full h-full content-center border border-dashed border-gray-300 p-4 rounded-lg bg-gray-50 relative">
                    <input
                      type="file"
                      className="opacity-0 absolute inset-0 cursor-pointer"
                    />
                    <Typography variant="body1" className="text-center">
                      Sube tu archivo
                    </Typography>
                    <Typography variant="body1" className="text-gray-500 text-center">
                      Formato admitido: PNG, JPG o PDF
                    </Typography>
                  </Box>
                </div>
              </motion.div>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
