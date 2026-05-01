import React, { createContext, useState } from "react";

export const PremiumContext = createContext();

export const PremiumProvider = ({ children }) => {

  const user = JSON.parse(localStorage.getItem("user"));

  const [isPremium, setIsPremium] = useState(user?.isPremium || false);

  const activatePremium = () => {
    setIsPremium(true);

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      storedUser.isPremium = true;
      localStorage.setItem("user", JSON.stringify(storedUser));
    }
  };

  return (
    <PremiumContext.Provider value={{ isPremium, activatePremium }}>
      {children}
    </PremiumContext.Provider>
  );
};