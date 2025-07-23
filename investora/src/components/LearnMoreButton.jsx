// src/components/LearnMoreButton.jsx
import React from "react";

const LearnMoreButton = ({
  onClick,
  className = "",
  children = "Learn More",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-8 py-3 
        bg-transparent 
        border-1 border-gray-500 hover:border-gray-400 
        text-gray-500 hover:text-gray-400 
        hover:shadow-[0_4px_15px_rgba(255,255,255,0.2)]
        font-medium rounded-full 
        transition-all duration-300 ease-in-out 
        transform hover:scale-105 
        min-w-[140px]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default LearnMoreButton;
