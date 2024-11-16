"use client";

import { useState } from 'react';
import Step1DNI from './components/Step1DNI';
import Step2Profile from './components/Step2Profile';
import Step3CardUpload from './components/Step3CardUpload';
import Step4DepositAccount from './components/Step4DepositAccount';
import Step5Confirmation from './components/Step5Confirmation';
import StepIndicator from './components/StepIndicator';

interface DNIData {
  dniFront: string | null;
  dniBack: string | null;
}

interface ProfileData {
  profileDNI: string | null;
}

export default function Home() {
  const [step, setStep] = useState<number>(1);
  const [dniData, setDniData] = useState<DNIData>({ dniFront: null, dniBack: null });
  const [profileData, setProfileData] = useState<ProfileData>({ profileDNI: null });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleStepClick = (stepNumber: number) => {
    if (stepNumber < step || stepNumber === 1) setStep(stepNumber);
  };

  const handleDNICompletion = (data: DNIData) => setDniData(data);
  const handleProfileCompletion = (data: ProfileData) => setProfileData(data);

  const restart = () => {
    localStorage.clear(); // Borrar todo el localStorage
    setStep(1);
    setDniData({ dniFront: null, dniBack: null });
    setProfileData({ profileDNI: null });
  };

  return (
    <div className="min-h-screen p-8 pb-20 bg-transparent">
      <h1 className="text-2xl font-bold text-center mb-8">Validación de Usuario - AltoquePerú</h1>

      <StepIndicator currentStep={step} onStepClick={handleStepClick} />

      {step === 1 && (
        <Step1DNI
          nextStep={nextStep}
          onCompletion={handleDNICompletion}
          initialData={dniData}
        />
      )}
      {step === 2 && (
        <Step2Profile
          nextStep={nextStep}
          prevStep={prevStep}
          onCompletion={handleProfileCompletion}
          initialData={profileData}
        />
      )}
      {step === 3 && (
        <Step3CardUpload
          nextStep={nextStep}
          prevStep={prevStep}
          onCompletion={(data: string) => console.log(data)} // Dummy function to meet prop requirement
        />
      )}
      {step === 4 && (
        <Step4DepositAccount
          finish={nextStep}
          prevStep={prevStep}
          onCompletion={(data: { accountNumber: string; accountHolder: string }) => console.log(data)} // Dummy function to meet prop requirement
        />
      )}
      {step === 5 && <Step5Confirmation restart={restart} />}
    </div>
  );
}