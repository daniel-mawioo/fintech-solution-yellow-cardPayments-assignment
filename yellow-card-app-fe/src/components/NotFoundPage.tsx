import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4 text-red-500">Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <button
        onClick={() => navigate("/")}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFoundPage;
