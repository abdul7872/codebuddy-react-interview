import React, { useRef, useState } from "react";
import Form1 from "./Step1";
import Form2 from "./Step2";
import Form3 from "./Step3";
import { useNavigate } from "react-router-dom";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const maxStepDone = useRef(1);

  const navigate = useNavigate();

  const handleSaveAndNext = (data) => {
    if (maxStepDone.current == currentStep) {
      maxStepDone.current = currentStep + 1;
    }
    const updateData = { ...formData, ...data };
    setFormData({ ...updateData });
    currentStep === 3 ? postData(updateData) : setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSave = (data) => {
    const updateData = { ...formData, ...data };
    setFormData({ ...updateData });
  };

  const postData = async (payload) => {
    try {
      delete payload.acceptTermsAndCondition;

      const response = await fetch("https://codebuddy.review/submit", {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log(result);
      if (result.message === "Success") {
        navigate("/posts");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-30 flex h-full flex-col rounded-md bg-gray-200 px-4 py-6">
        <button
          onClick={() => setCurrentStep(1)}
          className={`mb-4 rounded-md p-3 text-left ${
            currentStep === 1 ? "bg-blue-500 text-white" : "bg-white text-black"
          }`}
        >
          Form 1
        </button>
        <button
          onClick={() => setCurrentStep(2)}
          disabled={maxStepDone.current < 2}
          className={`mb-4 rounded-md p-3 text-left
            disabled:cursor-not-allowed disabled:opacity-70 ${
              currentStep === 2 ? "bg-blue-500 text-white" : "bg-white text-black"
            }`}
        >
          Form 2
        </button>
        <button
          onClick={() => setCurrentStep(3)}
          disabled={maxStepDone.current < 3}
          className={`rounded-md p-3 text-left
            disabled:cursor-not-allowed disabled:opacity-70 
            ${currentStep === 3 ? "bg-blue-500 text-white" : "bg-white text-black"}
            `}
        >
          Form 3
        </button>
      </div>
      <div className="flex-1">
        {currentStep === 1 && <Form1 onNext={handleSaveAndNext} onSave={handleSave} formData={formData} />}
        {currentStep === 2 && <Form2 onNext={handleSaveAndNext} onSave={handleSave} formData={formData} onBack={handleBack} />}
        {currentStep === 3 && <Form3 onSave={handleSaveAndNext} formData={formData} onBack={handleBack} />}
      </div>
    </div>
  );
};

export default MultiStepForm;
