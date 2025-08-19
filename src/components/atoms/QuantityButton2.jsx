import React, { useContext, useState } from 'react';
import { ValueContext } from '../../context/valueContext,jsx';

const QuantityButton2 = ({ min = 1, max = 99, onChange, className = "", item = "", cart ,setCart}) => {
  const [quantity, setQuantity] = useState(min);
  //const {handleQuantityChange} = useContext(ValueContext)

        const handleDecrease = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      //onChange && onChange(newQuantity);
    setCart(prevCart =>
      prevCart.map(cartItem =>
        cartItem.skuId === item.skuId
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      //onChange && onChange(newQuantity);
    setCart(prevCart =>
      prevCart.map(cartItem =>
        cartItem.skuId === item.skuId
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );
      
    }
  };
  


  return (
    <div className={"flex items-center justify-center text-off-white font-medium p-1 bg-sandy-beige rounded-md " + `${className}`}>
      <button onClick={handleDecrease} className="px-3 hover:cursor-pointer">−</button>
      <span>{item ? item.quantity : quantity}</span>
      <button onClick={handleIncrease} className="px- hover:cursor-pointer">+</button>
    </div> 
  );
};

export default QuantityButton2;