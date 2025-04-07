import React, { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  helpText?: string;
  error?: string;
  fullWidth?: boolean;
}

export function Select({
  label,
  options,
  helpText,
  error,
  className = "",
  fullWidth = true,
  id,
  ...props
}: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

  const selectStyles = `px-3 py-2 bg-white dark:bg-gray-900 border rounded-md text-sm shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-portal-primary focus:border-transparent transition-all appearance-none pr-10
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
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select id={selectId} className={selectStyles} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>
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
