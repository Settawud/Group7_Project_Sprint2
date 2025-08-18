import { ValueContext } from "./valueContext,jsx";
import { useState } from "react";

export const MessageProvider = ({ children }) => {
 const [cart, setCart] = useState([]);
    
      const handleDecrease = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      //onChange && onChange(newQuantity);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      //onChange && onChange(newQuantity);
    }
  };
    

  return (
    <ValueContext
      value={{cart, handleQuantityChange}}
    >
      {children}
    </ValueContext>
  );
};
