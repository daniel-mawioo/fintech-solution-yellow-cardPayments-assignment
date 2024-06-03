import React, { useEffect, useState } from "react";
import CustomDropdown from "./CustomDropdown";
import LoadingIndicator from "./LoadingIndicator";

interface WithdrawAmountProps {
  amount: string;
  setAmount: (amount: string) => void;
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  error?: string;
  channels: any[];
  selectedCountry: string;
  selectedPaymentMethod: string;
}

const WithdrawAmount: React.FC<WithdrawAmountProps> = ({
  amount,
  setAmount,
  selectedCurrency,
  setSelectedCurrency,
  error,
  channels,
  selectedCountry,
  selectedPaymentMethod,
}) => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchCurrencies = () => {
      try {
        // Extract unique currencies from active channels
        const activeChannels = channels.filter(
          (channel) => channel.status === "active"
        );
        const uniqueCurrencies = [
          ...new Set(activeChannels.map((channel) => channel.currency)),
        ];
        setCurrencies(uniqueCurrencies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching currencies:", error);
        setFetchError("Error fetching currencies.");
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, [channels]);

  const validateAmount = (inputAmount: string) => {
    const selectedChannel = channels.find(
      (channel) =>
        channel.country === selectedCountry &&
        channel.channelType === selectedPaymentMethod
    );

    if (selectedChannel) {
      if (
        parseFloat(inputAmount) < selectedChannel.min ||
        parseFloat(inputAmount) > selectedChannel.max
      ) {
        return `Amount must be between ${selectedChannel.min} and ${selectedChannel.max} ${selectedChannel.currency}`;
      }
    }
    return "";
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount = e.target.value;
    if (!isNaN(Number(inputAmount))) {
      setAmount(inputAmount);
      const validationError = validateAmount(inputAmount);
      setFetchError(validationError);
    } else {
      setFetchError("Please enter a valid number.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-xl font-bold mb-4 text-green-500">
        Enter Amount to Withdraw
      </h2>
      {loading && <LoadingIndicator />}
      {fetchError && <p className="text-red-500">{fetchError}</p>}
      {!loading && !fetchError && (
        <>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="w-full p-3 border rounded mb-4"
            placeholder="Amount"
            min="0"
            step="any"
          />
          <CustomDropdown
            options={currencies}
            selectedOption={selectedCurrency}
            onOptionSelect={setSelectedCurrency}
            placeholder="Select a currency"
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {fetchError && <p className="text-red-500 mt-2">{fetchError}</p>}
        </>
      )}
    </div>
  );
};

export default WithdrawAmount;
