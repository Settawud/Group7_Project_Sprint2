import React from 'react'
import { useState } from 'react';

const CheckboxWithText = ({ name, text = "", className = "", id="" , onChange, checked}) => {
    
    
  return (
    
    <div className='${className}'>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} name={name} className="mr-1" />
          <label for={name}>{text}</label>
    </div>
  )
}

export default CheckboxWithText