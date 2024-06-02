import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessModal: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(0);
  };

  const handleNewPayment = () => {
    navigate(0); // Reloads the current page to reset the form
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-green-500">Success!</h2>
        <p>Your withdrawal request has been submitted successfully.</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleNewPayment}
            className="px-4 py-2 bg-yellow-300 text-black rounded hover:bg-yellow-400 transition mr-2"
          >
            Make Another Payment
          </button>
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
