import React, { createContext, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {

  const [orders, setOrders] = useState([]);

  const placeOrder = (cartItems, totalAmount) => {
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: totalAmount,
      status: "Processing",
      date: new Date().toLocaleDateString()
    };

    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};