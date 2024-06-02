import React, { useEffect, useState } from "react";
import CustomDropdown from "./CustomDropdown";
import { fetchChannels } from "../services/apiService";
import { toCamelCase } from "../utils/stringUtils";

interface PaymentMethodSelectorProps {
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (method: string) => void;
  error?: string;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  error,
}) => {
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      setLoading(true); // Start loading
      try {
        const data = await fetchChannels(null);
        console.log(data);
        const methods = data.paymentMethods.map((method: string) =>
          toCamelCase(method)
        );
        setPaymentMethods(methods);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
      setLoading(false); // End loading
    };

    fetchPaymentMethods();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-xl font-bold mb-4 text-green-500">
        Select Payment Method
      </h2>
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <CustomDropdown
            options={paymentMethods}
            selectedOption={selectedPaymentMethod}
            onOptionSelect={setSelectedPaymentMethod}
            placeholder="Select a payment method"
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
      )}
    </div>
  );
};

export default PaymentMethodSelector;
