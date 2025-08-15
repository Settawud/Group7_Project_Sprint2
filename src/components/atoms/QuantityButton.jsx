import React, { useState } from 'react';

const QuantityButton = ({ min = 1, max = 99, onChange, className="" }) => {
  const [quantity, setQuantity] = useState(min);

  const handleDecrease = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange && onChange(newQuantity);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onChange && onChange(newQuantity);
    }
  };

  return (
    <div className={"flex items-center justify-around text-off-white font-medium p-2 bg-sandy-beige rounded-md " + `${className}`}>
      <button onClick={handleDecrease} className="px-3">−</button>
      <span>{quantity}</span>
      <button onClick={handleIncrease} className="px-3">+</button>
    </div>
  );
};

export default QuantityButton;