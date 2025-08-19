import React, { useState } from 'react'
import CartTable from '../components/organisms/CartTable';
import CartAction from '../components/organisms/CartAction';

const Cart = () => {
    const [cart, setCart] = useState([
      { skuId: "123", image: ".", name: "เกาอี้test", altText: "เก้าอี้test", price: 800, quantity: 1, checked: false},
      { skuId: "124", image: ".", name: "table", altText: "table", price: 2000, quantity: 1, checked: false}
  ]);

 // let cart = [{ skuId: "123", image: ".", name: "เกาอี้test", altText: "เก้าอี้test", price: "800", quantity: "1" }]
  

  return (
    <div className="bg-avocado-400 min-h-dvh px-4 relative">
      <div className="text-center mx-auto sm:max-w-[80%] lg:max-w-[60%] bg-white pt-6 pb-4">
        <h3>รายการสินค้าในตะกร้า</h3>
      </div>
      <CartTable cart={cart} setCart={setCart} className="sm:max-w-[80%] lg:max-w-[60%] mx-auto"/>
      <div className='sm:max-w-[80%] lg:max-w-[60%] mx-auto bottom-0 fixed left-0 right-0 px-4 sm:px-0'>
        <CartAction cart={cart} setCart={setCart}/>

      </div>
    </div>
  )
}

export default Cart