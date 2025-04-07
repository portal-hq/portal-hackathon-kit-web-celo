import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  isLoading?: boolean;
}

export function Card({
  children,
  className = "",
  title,
  description,
  footer,
  isLoading = false,
}: CardProps) {
  return (
    <div
      className={`animate-fade-in bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-card overflow-hidden ${className}`}
    >
      {isLoading ? (
        <div className="p-6 flex flex-col space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6 animate-pulse"></div>
          </div>
        </div>
      ) : (
        <>
          {(title || description) && (
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              {title && <h3 className="text-lg font-semibold">{title}</h3>}
              {description && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {description}
                </p>
              )}
            </div>
          )}
          <div className="p-6">{children}</div>
          {footer && (
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
              {footer}
            </div>
          )}
        </>
      )}
    </div>
  );
}
