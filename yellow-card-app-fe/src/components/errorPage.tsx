import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorModal: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-500">Error</h2>
        <p className="mb-4">
          There was an issue submitting your withdrawal request. Please try
          again later.
        </p>
        <button
          onClick={handleClose}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
