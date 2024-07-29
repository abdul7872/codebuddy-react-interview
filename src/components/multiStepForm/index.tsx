import React, { useState } from "react";
import Form1 from "./Step1";
import Form2 from "./Step2";
import Form3 from "./Step3";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (data) => {
    const updateData = { ...formData, ...data };
    setFormData(updateData);
    currentStep === 3 ? handleSave(updateData) : setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSave = async (payload) => {
    try {
      delete payload.acceptTermsAndCondition;

      const response = await fetch("https://codebuddy.review/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log(result);
      // if (result.message === "Success") {
      //   window.location.href = "/posts";
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="flex flex-col w-30 rounded-md bg-gray-200 h-full px-4 py-6">
        <button
          onClick={() => setCurrentStep(1)}
          className={`p-3 mb-4 rounded-md text-left ${currentStep === 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
        >
          Form 1
        </button>
        <button
          onClick={() => setCurrentStep(2)}
          className={`p-3 mb-4 rounded-md text-left ${currentStep === 2 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
        >
          Form 2
        </button>
        <button
          onClick={() => setCurrentStep(3)}
          className={`p-3 rounded-md text-left ${currentStep === 3 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
        >
          Form 3
        </button>
      </div>
      <div className="flex-1">
        {currentStep === 1 && <Form1 onNext={handleNext} formData={formData} />}
        {currentStep === 2 && <Form2 onNext={handleNext} formData={formData} onBack={handleBack} />}
        {currentStep === 3 && <Form3 onSave={handleNext} formData={formData} onBack={handleBack} />}
      </div>
    </div>
  );
};

export default MultiStepForm;
