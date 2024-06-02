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

  useEffect(() => {
    const fetchPaymentMethods = async () => {
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
    };

    fetchPaymentMethods();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-xl font-bold mb-4 text-green-500">
        Select Payment Method
      </h2>
      <CustomDropdown
        options={paymentMethods}
        selectedOption={selectedPaymentMethod}
        onOptionSelect={setSelectedPaymentMethod}
        placeholder="Select a payment method"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default PaymentMethodSelector;
