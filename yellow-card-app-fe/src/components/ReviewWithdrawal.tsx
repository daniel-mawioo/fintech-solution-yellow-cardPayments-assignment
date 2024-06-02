import React from "react";

interface ReviewWithdrawalProps {
  selectedCountry: string;
  selectedPaymentMethod: string;
  amount: string;
  selectedCurrency: string;
  recipient: {
    name: string;
    accountNumber: string;
    reason: string;
  };
  handleSubmit: () => void;
}

const ReviewWithdrawal: React.FC<ReviewWithdrawalProps> = ({
  selectedCountry,
  selectedPaymentMethod,
  amount,
  selectedCurrency,
  recipient,
  handleSubmit,
}) => {
  // Assuming a static conversion rate for simplicity
  const conversionRate = 1.2;
  const totalAmountInFiat = parseFloat(amount) * conversionRate;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-xl font-bold mb-4 text-green-500">
        Review Withdrawal Request
      </h2>
      <div className="border p-6 rounded w-full shadow-md">
        <p className="mb-2">Selected Country: {selectedCountry}</p>
        <p className="mb-2">Payment Method: {selectedPaymentMethod}</p>
        <p className="mb-2">Account Holder Name: {recipient.name}</p>
        <p className="mb-2">Account Number: {recipient.accountNumber}</p>
        <p className="mb-2">
          Total Amount in {selectedCurrency}: {amount}
        </p>
        <p className="mb-2">
          {selectedCurrency}/Fiat Rate: {conversionRate}
        </p>
        <p>Total Amount in Fiat: {totalAmountInFiat.toFixed(2)}</p>
      </div>
      <button
        onClick={handleSubmit}
        className="w-full p-3 mt-6 bg-green-500 text-white rounded"
      >
        Confirm
      </button>
    </div>
  );
};

export default ReviewWithdrawal;
