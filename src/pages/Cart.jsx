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
    <div className="bg-off-white sm:max-w-[80%] lg:max-w-[60%] mx-auto px-4">
      <div className="text-center pt-6 pb-4">
          <h3>รายการสินค้าในตะกร้า</h3>
      </div>
      <CartTable cart={cart} setCart={setCart} />
      <div>
        <CartAction className="" cart={cart} setCart={setCart} />
      </div>
    </div>
  )
}

export default Cart