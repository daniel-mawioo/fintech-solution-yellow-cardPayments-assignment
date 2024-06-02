import React, { useEffect, useState } from "react";
import CustomDropdown from "./CustomDropdown";
import { fetchChannels } from "../services/apiService";

interface WithdrawAmountProps {
  amount: string;
  setAmount: (amount: string) => void;
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  error?: string;
}

const WithdrawAmount: React.FC<WithdrawAmountProps> = ({
  amount,
  setAmount,
  selectedCurrency,
  setSelectedCurrency,
  error,
}) => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const data = await fetchChannels(null);
        // Extract unique currencies
        const uniqueCurrencies = [
          ...new Set(
            data.channels.map((channel: any) => channel.currency) as string[]
          ),
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
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-xl font-bold mb-4 text-green-500">
        Enter Amount to Withdraw
      </h2>
      {loading && <p>Loading...</p>}
      {fetchError && <p className="text-red-500">{fetchError}</p>}
      {!loading && !fetchError && (
        <>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border rounded mb-4"
            placeholder="Amount USD"
          />
          <CustomDropdown
            options={currencies}
            selectedOption={selectedCurrency}
            onOptionSelect={setSelectedCurrency}
            placeholder="Select a currency"
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
      )}
    </div>
  );
};

export default WithdrawAmount;
