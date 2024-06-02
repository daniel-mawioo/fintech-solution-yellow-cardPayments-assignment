import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CountrySelector from "../components/CountrySelector";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import WithdrawAmount from "../components/WithdrawAmount";
import RecipientDetails from "../components/RecipientDetails";
import ReviewWithdrawal from "../components/ReviewWithdrawal";
import Confirmation from "../components/Confirmation";

const MainForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [recipient, setRecipient] = useState({
    name: "",
    accountNumber: "",
    reason: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1 && !selectedCountry) {
      newErrors.country = "Please select a country";
    }
    if (step === 2 && !selectedPaymentMethod) {
      newErrors.paymentMethod = "Please select a payment method";
    }
    if (step === 3 && (!amount || !selectedCurrency)) {
      newErrors.amount = "Please enter an amount and select a currency";
    }
    if (
      step === 4 &&
      (!recipient.name || !recipient.accountNumber || !recipient.reason)
    ) {
      newErrors.recipientDetails = "Please fill in all fields.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      const sender = {
        name: "Sample Name",
        country: "US",
        phone: "+12222222222",
        address: "Sample Address",
        dob: "10/10/2010",
        email: "email@domain.com",
        idNumber: "0123456789",
        idType: "license",
      };

      const destination = {
        accountName: recipient.name,
        accountNumber: recipient.accountNumber,
        accountType: "momo",
        country: selectedCountry,
        networkId: selectedPaymentMethod,
        accountBank: selectedPaymentMethod,
      };

      const requestBody = {
        channelId: "your-channel-id", // You need to replace this with the actual channel ID you have
        sequenceId: "234567342679",
        amount: parseFloat(amount), // Assuming amount is provided in USD
        reason: recipient.reason,
        destination,
        sender,
      };

      const response = await fetch("http://localhost:4000/api/submit-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        navigate("/success");
      } else {
        navigate("/error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      navigate("/error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {step === 1 && (
          <CountrySelector
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            error={errors.country}
          />
        )}
        {step === 2 && (
          <PaymentMethodSelector
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            error={errors.paymentMethod}
          />
        )}
        {step === 3 && (
          <WithdrawAmount
            amount={amount}
            setAmount={setAmount}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            error={errors.amount}
          />
        )}
        {step === 4 && (
          <RecipientDetails
            recipient={recipient}
            setRecipient={setRecipient}
            error={errors.recipientDetails}
          />
        )}
        {step === 5 && (
          <ReviewWithdrawal
            selectedCountry={selectedCountry}
            selectedPaymentMethod={selectedPaymentMethod}
            amount={amount}
            selectedCurrency={selectedCurrency}
            recipient={recipient}
            handleSubmit={handleSubmit}
          />
        )}
        {step === 6 && <Confirmation />}

        <div className="flex justify-between mt-4">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Back
            </button>
          )}
          {step < 6 && (
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition ml-auto"
            >
              Next
            </button>
          )}
          {step === 5 && (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition ml-auto"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainForm;
