import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helpText?: string;
  error?: string;
  fullWidth?: boolean;
}

export function Input({
  label,
  helpText,
  error,
  className = "",
  fullWidth = true,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  const inputStyles = `px-3 py-2 bg-white dark:bg-gray-900 border rounded-md text-sm shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-portal-primary focus:border-transparent transition-all
    ${
      error
        ? "border-red-500 dark:border-red-600 focus:border-red-500 dark:focus:border-red-600 focus:ring-red-300 dark:focus:ring-red-900/30"
        : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
    }
    ${
      props.disabled
        ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed text-gray-500 dark:text-gray-400"
        : ""
    }
    ${fullWidth ? "w-full" : ""}
    ${className}
  `;

  return (
    <div className={`${fullWidth ? "w-full" : ""}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <input id={inputId} className={inputStyles} {...props} />
      {(helpText || error) && (
        <p
          className={`mt-1 text-sm ${
            error
              ? "text-red-500 dark:text-red-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {error || helpText}
        </p>
      )}
    </div>
  );
}
