// src/components/LoadingIndicator.tsx
import React from "react";

const LoadingIndicator: React.FC = () => (
  <div className="w-full flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
  </div>
);

export default LoadingIndicator;
