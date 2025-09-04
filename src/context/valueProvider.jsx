import { ValueContext } from './ValueContext';
import { useState } from "react";

export const ValueProvider = ({ children }) => {
     const [cart, setCart] = useState([
       { skuId: "123", image: ".", name: "เกาอี้testtttttttt", altText: "เก้าอี้test", price: 800, quantity: 1, checked: false},
       { skuId: "124", image: ".", name: "table", altText: "table", price: 2000, quantity: 1, checked: false}
     ]);  
  
  const [checkoutItem, setCheckoutItem] = useState([])

  const [installChecked, setInstallChecked] = useState(false);

  function addToCart(product,quantity) {
    const item = { image: product.variants.image, name: product.name, variant:product.variant.option, selectQuantity: quantity, price:product.variant.price, itemChecked: false }
    setCart([...cart, item])
    //fetchCart
  }
    
  return (
    <ValueContext
      value={{cart,setCart, checkoutItem, setCheckoutItem, installChecked, setInstallChecked, addToCart}}
    >
      {children}
    </ValueContext>
  );
};
