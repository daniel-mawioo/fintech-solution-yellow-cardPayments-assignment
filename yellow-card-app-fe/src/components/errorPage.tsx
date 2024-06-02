import React from "react";

const ErrorPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4 text-red-500">Error</h2>
      <p>
        There was an issue submitting your withdrawal request. Please try again
        later.
      </p>
    </div>
  );
};

export default ErrorPage;
