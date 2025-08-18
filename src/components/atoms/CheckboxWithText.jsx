import React from 'react'
import { useState } from 'react';

const CheckboxWithText = ({ name, text = "", className = "", id="" ,setCart, cart, skuId=""}) => {
    
      const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (name === "select") {
      setCart(prevCart =>
        prevCart.map(item =>
          item.skuId === skuId ? { ...item, checked: !item.checked } : item
        )
      );
    }
    else if (name === "selectAll") {
            setCart(prevCart =>
        prevCart.map(item =>
          ({ ...item, checked: true })
        )
      );
    }
    };
    
  return (
    
    <div className='${className}'>
        <input type="checkbox" id={id} checked={isChecked} onChange={handleCheckboxChange} name={name} className="mx-1"/>
          <label for={name}>{text}</label>
    </div>
  )
}

export default CheckboxWithText