"use client";

import {  useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TiTick } from "react-icons/ti";
import { FaMoneyBillWave, FaPercent, FaPiggyBank } from "react-icons/fa";
import {
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
import Alert from "./Components/Alert";
import { getAccountsFromAPI } from "./accounts/api/accountApi";
import { Account } from "../models/Account";

const banks = [
  { label: "BCP", image: "/assets/BCP.jpg" },
  { label: "Scotiabank", image: "/assets/Scotiabank.jpg" },
  { label: "BanBif", image: "/assets/BanBif.jpg" },
  { label: "BBVA", image: "/assets/BBVA.jpg" },
  { label: "Interbank", image: "/assets/Interbank.jpg" },
];

interface Bank {
  label: string;
  image: string;
}

const steps = ["Cotiza", "Cuentas", "Transfiere"];

const calculateCommission = (amountSent: number, bank: string, promoCode: string): number => {
  const promoCodes = ["Beto25", "Luis25", "Jack25", "Richi25"];
  const highLimit = amountSent > 4000;
  const midLimit = amountSent > 3500;
  const lowLimit = amountSent > 2000;

  if (promoCodes.includes(promoCode)) {
    if (["BCP", "Interbank", "BBVA"].includes(bank)) return highLimit ? Math.floor(amountSent * 0.0025) : 10;
    if (["Scotiabank", "BanBif"].includes(bank)) return midLimit ? Math.floor(amountSent * 0.0035) : 12;
  } else if (promoCode === "Jonathan30") {
    if (["BCP", "Interbank", "BBVA"].includes(bank)) return highLimit ? Math.floor(amountSent * 0.003) : 10;
    if (["Scotiabank", "BanBif"].includes(bank)) return midLimit ? Math.floor(amountSent * 0.004) : 12;
  }

  return lowLimit ? Math.floor(amountSent * 0.005) : 10;
};

export default function Home() {
  const [amountSent, setAmountSent] = useState(0);
  const [amountReceived, setAmountReceived] = useState(0);
  const [selectedBank, setSelectedBank] = useState<Bank>(banks[0]);
  const [promoCode, setPromoCode] = useState('');
  const [commission, setCommission] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState<"success" | "error" | "warning">("success");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [voucher, setVoucher] = useState<File | null>(null);
  const [voucherPreview, setVoucherPreview] = useState<string | null>(null);

  useEffect(() => {
    const storedAccounts = getAccountsFromAPI();
    setAccounts(storedAccounts);
  }, []);

  useEffect(() => {
    const newCommission = calculateCommission(amountSent, selectedBank.label, promoCode);
    const newAmountReceived = amountSent - newCommission;

    if (amountSent > 0) {
      setCommission(newCommission);
      setAmountReceived(newAmountReceived > 0 ? newAmountReceived : 0);
      setShowAlert(false);
    }
  }, [amountSent, promoCode, selectedBank, currentStep]);

  const handleNext = () => {
    if (currentStep === 2 && !selectedAccount) {
      setAlertMessage("Debes seleccionar una cuenta de banco.");
      setShowAlert(true);
      setTypeAlert("error");
      return;
    }
    if (amountSent < 20) {
      setAlertMessage("El monto recibido no puede ser menor a S/20.");
      setShowAlert(true);
      setTypeAlert("error");
      return;
    }
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountSent(parseFloat(e.target.value) || 0);
  };

  const handleBankSelect = (event: SelectChangeEvent<string>) => {
    const newValue = banks.find((bank) => bank.label === event.target.value);
    if (newValue) setSelectedBank(newValue);
  };

  const handleAccountSelect = (event: SelectChangeEvent<string>) => {
    setSelectedAccount(event.target.value);
  };

  const handleVoucherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVoucher(file); 
      const reader = new FileReader();
      reader.onloadend = () => {
        setVoucherPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleFinish = () => {
    setAlertMessage("Proceso exitoso. Volviendo al inicio.");
    setTypeAlert("success");
    setShowAlert(true);
    setTimeout(() => {
      setCurrentStep(1);
      setVoucher(null);
      setVoucherPreview(null);
      setSelectedAccount("");
      setAmountSent(0);
      setPromoCode('');
      setShowAlert(false);
    }, 2000);
  };
  return (
    <div className="h-[100vh] flex flex-col justify-between">
      {showAlert && <Alert message={alertMessage} type={typeAlert} />}

      <Header steps={steps} currentStep={currentStep} handlePrev={handlePrev} handleNext={handleNext} canFinish={!!voucher} handleFinish={handleFinish} />

      <motion.div key={currentStep} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex flex-col items-center justify-center h-full w-full px-4">
        <div className="flex flex-col justify-between">
          {currentStep === 1 && (
            <Step1
              amountSent={amountSent}
              amountReceived={amountReceived}
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              selectedBank={selectedBank}
              handleAmountChange={handleAmountChange}
              handleBankSelect={handleBankSelect}
              commission={commission}
            />
          )}
          {currentStep === 2 && (
            <Step2
              selectedBank={selectedBank}
              amountSent={amountSent}
              amountReceived={amountReceived}
              commission={commission}
              selectedAccount={selectedAccount}
              handleAccountSelect={handleAccountSelect}
              accounts={accounts}
            />
          )}
          {currentStep === 3 && (
            <Step3
              selectedBank={selectedBank}
              handleVoucherChange={handleVoucherChange}
              voucherPreview={voucherPreview}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}

// Header Component
const Header = ({ steps, currentStep, handlePrev, handleNext, canFinish, handleFinish }: { 
  steps: string[], 
  currentStep: number, 
  handlePrev: () => void, 
  handleNext: () => void, 
  canFinish: boolean, 
  handleFinish: () => void 
}) => (
  <div className="flex justify-around py-8 text-gray-700">
    <motion.div className="flex justify-between items-center" initial={{ opacity: 0, translateX: -30 }} animate={{ opacity: 1, translateX: 0 }} transition={{ duration: 0.5 }}>
      <Button variant="outlined" color="secondary" disabled={currentStep === 1} onClick={handlePrev}>
        Anterior
      </Button>
    </motion.div>
    <StepProgress steps={steps} currentStep={currentStep} />
    <motion.div className="flex justify-between items-center text-gray-800" initial={{ opacity: 0, translateX: 30 }} animate={{ opacity: 1, translateX: 0 }} transition={{ duration: 0.5 }}>
      <Button variant="contained" color="primary" onClick={currentStep === steps.length ? handleFinish : handleNext} disabled={currentStep === steps.length && !canFinish}>
        {currentStep === steps.length ? "Finalizar" : "Siguiente"}
      </Button>
    </motion.div>
  </div>
);


// Step Progress Indicator
const StepProgress = ({ steps, currentStep }: { steps: string[], currentStep: number }) => (
  <div className="flex text-gray-700">
    {steps.map((step: any, i: number) => (
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
);

// Step 1 Component
const Step1 = ({ amountSent, amountReceived, promoCode, setPromoCode, selectedBank, handleAmountChange, handleBankSelect, commission }: {
  amountSent: number;
  amountReceived: number;
  promoCode: string;
  setPromoCode: (code: string) => void;
  selectedBank: Bank;
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBankSelect: (event: SelectChangeEvent<string>) => void;
  commission: number;
}) => (
  <div className="flex flex-col md:flex-row justify-between p-6 gap-6">
    <motion.div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg" initial={{ opacity: 0, translateX: -30 }} animate={{ opacity: 1, translateX: 0 }} transition={{ duration: 0.8 }}>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Cotiza el tipo de cambio</h2>
      <FormControl fullWidth className="mb-6">
        <InputLabel htmlFor="envias">ENVIAS</InputLabel>
        <OutlinedInput id="envias" startAdornment={<InputAdornment position="start">S/.</InputAdornment>} value={amountSent} onChange={handleAmountChange} label="ENVIAS" />
      </FormControl>
      <FormControl fullWidth className="mb-6">
        <InputLabel htmlFor="recibes">RECIBES</InputLabel>
        <OutlinedInput id="recibes" startAdornment={<InputAdornment position="start">S/.</InputAdornment>} value={amountReceived.toFixed(2)} disabled label="RECIBES" />
      </FormControl>
      <TextField label="Código Promocional" variant="outlined" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} fullWidth className="mb-6" />
      <FormControl fullWidth className="mb-6">
        <Select value={selectedBank.label} onChange={handleBankSelect} displayEmpty inputProps={{ "aria-label": "Without label" }}>
          {banks.map((bank: Bank, index: number) => <MenuItem key={index} value={bank.label}>{bank.label}</MenuItem>)}
        </Select>
      </FormControl>
    </motion.div>
    <Summary selectedBank={selectedBank} commission={commission} amountReceived={amountReceived} />
  </div>
);

// Step 2 Component
const Step2 = ({ selectedBank, amountSent, amountReceived, commission, selectedAccount, handleAccountSelect, accounts }: {
  selectedBank: Bank;
  amountSent: number;
  amountReceived: number;
  commission: number;
  selectedAccount: string;
  handleAccountSelect: (event: SelectChangeEvent<string>) => void;
  accounts: Account[];
}) => (
  <div className="flex flex-col md:flex-row justify-between p-6 gap-6">
    <motion.div
      className="w-full bg-white p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Typography variant="h6" gutterBottom>Detalles de la Transferencia</Typography>
      <Box>
        <Typography variant="body1" className="mb-4">
          <strong>Banco Seleccionado:</strong> {selectedBank.label}
        </Typography>
        <Typography variant="body1" className="mb-4 flex">
          <FaPercent size={20} className="mr-2 text-gray-500" />
          <strong>Comisión:</strong> S/. {commission.toFixed(2)}
        </Typography>
        <Typography variant="body1" className="mb-4 flex">
          <FaMoneyBillWave size={20} className="mr-2 text-gray-500" />
          <strong>Monto a Enviar:</strong> S/. {amountSent}
        </Typography>
        <Typography variant="body1" className="mb-4 flex">
          <FaPiggyBank size={20} className="mr-2 text-gray-500" />
          <strong>Monto a Recibir:</strong> S/. {amountReceived.toFixed(2)}
        </Typography>

        <Box className="p-4 bg-gray-100 rounded-lg mt-6">
          <Typography variant="h6" gutterBottom>Cuenta donde recibirás el dinero</Typography>
          <FormControl fullWidth className="mb-6">
            <InputLabel htmlFor="cuenta">Selecciona una cuenta</InputLabel>
            <Select value={selectedAccount} onChange={handleAccountSelect} displayEmpty inputProps={{ "aria-label": "Selecciona una cuenta" }}>
              {accounts.map((account: Account, index: number) => (
                <MenuItem key={index} value={account.cuenta}>
                  {account.banco} - {account.cuenta}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </motion.div>
  </div>
);

// Step 3 Component
const Step3 = ({ selectedBank, handleVoucherChange, voucherPreview }: {
  selectedBank: Bank;
  handleVoucherChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  voucherPreview: string | null;
}) => (
  <div className="flex flex-col xl:flex-row max-xl:items-center p-6 gap-6">
    <motion.div
      className="xl:max-w-[55vh] max-xl:min-w-[55vh] md:w-1/2 bg-white p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Typography variant="h6" gutterBottom className="text-gray-800 text-center">Banco Seleccionado</Typography>
      <Image src={selectedBank.image} alt={selectedBank.label} width={200} height={200} layout="responsive" className="w-full h-auto object-contain" />
    </motion.div>
    <motion.div
      className="xl:max-w-[55vh] max-xl:min-w-[55vh] md:w-1/2 bg-white p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Typography variant="h6" gutterBottom className="text-gray-800 text-center">Sube tu Voucher</Typography>
      <Box className="mb-6 w-full h-full content-center border border-dashed border-gray-300 p-4 rounded-lg bg-gray-50 relative">
        <input type="file" onChange={handleVoucherChange} className="opacity-0 absolute inset-0 cursor-pointer" />
        {voucherPreview ? (
          <Image width={20} height={20} src={voucherPreview} alt="Voucher Preview" className="w-full h-auto rounded-lg shadow-md" />
        ) : (
          <>
            <Typography variant="body1" className="text-center">Sube tu archivo</Typography>
            <Typography variant="body1" className="text-gray-500 text-center">Formato admitido: PNG, JPG o PDF</Typography>
          </>
        )}
      </Box>
    </motion.div>
  </div>
);



// Summary Component
const Summary = ({ selectedBank, commission, amountReceived }: {
  selectedBank: Bank;
  commission: number;
  amountReceived: number;
}) => (
  <motion.div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg" initial={{ opacity: 0, translateX: 30 }} animate={{ opacity: 1, translateX: 0 }} transition={{ duration: 0.8 }}>
    <Typography variant="h6" gutterBottom>Detalles del Banco y Comisión</Typography>
    {selectedBank ? (
      <Box>
        <Typography variant="body1" className="mb-4">Banco Seleccionado: <strong>{selectedBank.label}</strong></Typography>
        <Box display="flex" alignItems="center" className="mb-4"><FaPercent size={20} className="mr-2 text-gray-500" /><Typography variant="body1">Comisión: <strong>S/. {commission.toFixed(2)}</strong></Typography></Box>
        <Box display="flex" alignItems="center" className="mb-4"><FaMoneyBillWave size={20} className="mr-2 text-gray-500" /><Typography variant="body1">Total a recibir después de la comisión: <strong>S/. {amountReceived.toFixed(2)}</strong></Typography></Box>
      </Box>
    ) : (
      <Typography variant="body1" color="textSecondary">Selecciona un banco para ver los detalles.</Typography>
    )}
  </motion.div>
);
