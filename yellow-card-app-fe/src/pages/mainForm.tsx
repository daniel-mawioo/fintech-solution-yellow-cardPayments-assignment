import React, { useEffect, useState } from "react";
import CountrySelector from "../components/CountrySelector";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import WithdrawAmount from "../components/WithdrawAmount";
import RecipientDetails from "../components/RecipientDetails";
import ReviewWithdrawal from "../components/ReviewWithdrawal";
import Confirmation from "../components/Confirmation";
import SuccessModal from "../components/successPage";
import LoadingIndicator from "../components/LoadingIndicator";
import { submitPayment, fetchChannels } from "../services/apiService";

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
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [channelId, setChannelId] = useState<string | null>(null); // To store channel ID
  const [channels, setChannels] = useState<any[]>([]);

  useEffect(() => {
    const fetchChannelsData = async () => {
      try {
        const data = await fetchChannels(null);
        setChannels(data.channels);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };

    fetchChannelsData();
  }, []);
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
    } else if (step === 3) {
      const selectedChannel = channels.find(
        (channel) =>
          channel.country === selectedCountry &&
          channel.channelType === selectedPaymentMethod
      );
      if (selectedChannel) {
        setChannelId(selectedChannel.id);
        if (
          parseFloat(amount) < selectedChannel.min ||
          parseFloat(amount) > selectedChannel.max
        ) {
          newErrors.amount = `Amount must be between ${selectedChannel.min} and ${selectedChannel.max} ${selectedChannel.currency}`;
        }
      }
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
    setLoading(true);
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
        channelId: channelId, // Use the actual channel ID
        amount: parseFloat(amount), // Assuming amount is provided in local currency
        reason: recipient.reason,
        destination,
        sender,
      };

      const response = await submitPayment(requestBody);

      if (response) {
        setLoading(false);
        setShowSuccessModal(true);
      } else {
        setLoading(false);
        setSubmissionError("Failed to submit payment.");
        setStep(4);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setLoading(false);
      setSubmissionError((error as Error).message); // Display network error message
      setStep(4);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md relative">
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
            channels={channels}
            selectedCountry={selectedCountry}
            selectedPaymentMethod={selectedPaymentMethod}
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
          {step < 6 && step !== 5 && (
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition ml-auto"
            >
              Next
            </button>
          )}
        </div>

        {submissionError && (
          <div className="mt-4 p-2 bg-red-100 text-red-500 border border-red-500 rounded">
            {submissionError}
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <LoadingIndicator />
          </div>
        )}
      </div>

      {showSuccessModal && <SuccessModal />}
    </div>
  );
};

export default MainForm;
