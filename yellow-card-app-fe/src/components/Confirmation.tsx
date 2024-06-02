import React from "react";

const Confirmation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-xl font-bold mb-4 text-green-500">
        Transaction Confirmation
      </h2>
      <div className="border p-6 rounded w-full shadow-md">
        <p className="mb-2">Your transaction was successful!</p>
        <p>Funds have been sent to the recipient's bank account.</p>
      </div>
    </div>
  );
};

export default Confirmation;
