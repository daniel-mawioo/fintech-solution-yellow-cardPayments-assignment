import React from "react";

const SuccessPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4 text-green-500">Success!</h2>
      <p>Your withdrawal request has been submitted successfully.</p>
    </div>
  );
};

export default SuccessPage;
