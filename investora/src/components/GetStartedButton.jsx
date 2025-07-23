// src/components/GetStartedButton.jsx
import React from "react";

const GetStartedButton = ({
  onClick,
  className = "",
  children = "Get Started",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-8 py-3 
        bg-white 
        text-gray-900
        font-medium rounded-full 
        transition-all duration-300 ease-in-out 
        transform hover:scale-105 
        shadow-lg 
        hover:shadow-[0_4px_15px_rgba(255,255,255,0.2)]
        min-w-[140px]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default GetStartedButton;
