import React, { createContext, useState } from "react";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div
          className={`fixed z-50 px-6 py-3 rounded shadow text-white text-sm font-medium transition-all duration-300
            ${toast.type === "error" ? "bg-red-600" : "bg-black"}
            bottom-6 right-6 sm:bottom-6 sm:right-6 sm:left-auto left-1/2 transform sm:translate-x-0 -translate-x-1/2
          `}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};