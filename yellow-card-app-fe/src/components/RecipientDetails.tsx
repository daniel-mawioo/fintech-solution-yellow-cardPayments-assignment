import React from "react";
import { paymentReasons } from "../utils/paymentReasons";
import CustomDropdown from "./CustomDropdown";

interface RecipientDetailsProps {
  recipient: {
    name: string;
    accountNumber: string;
    reason: string;
  };
  setRecipient: (recipient: {
    name: string;
    accountNumber: string;
    reason: string;
  }) => void;
  error?: string;
}

const RecipientDetails: React.FC<RecipientDetailsProps> = ({
  recipient,
  setRecipient,
  error,
}) => {
  const handleAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    setRecipient({ ...recipient, accountNumber: numericValue });
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-xl font-bold mb-4 text-green-500">
        Enter Recipient Details
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        value={recipient.name}
        onChange={(e) => setRecipient({ ...recipient, name: e.target.value })}
        className="w-full p-3 border rounded mb-4"
        placeholder="Account Holder Name"
      />
      <input
        type="tel"
        value={recipient.accountNumber}
        onChange={handleAccountNumberChange}
        className="w-full p-3 border rounded mb-4"
        placeholder="Account Number"
      />
      <CustomDropdown
        options={paymentReasons.map(
          (reason) => reason.charAt(0).toUpperCase() + reason.slice(1)
        )}
        selectedOption={recipient.reason}
        onOptionSelect={(option) =>
          setRecipient({ ...recipient, reason: option.toLowerCase() })
        }
        placeholder="Select a reason"
      />
    </div>
  );
};

export default RecipientDetails;
