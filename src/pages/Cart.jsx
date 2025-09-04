import React, { useContext, useState } from 'react'
import CartTable from '../components/organisms/CartTable';
import CartAction from '../components/organisms/CartAction';
import { ValueContext } from '../context/ValueContext';
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";


const Cart = () => {

  const {cart, setCart} = useContext(ValueContext)

  return (
    <div className="min-h-screen flex flex-col bg-off-white">
      <Navbar />
      <main className="flex-1 px-4 relative">
        <div className="text-center mx-auto sm:max-w-[80%] lg:max-w-[60%] bg-off-white pt-6 pb-4">
          <h3>รายการสินค้าในตะกร้า</h3>
        </div>
        <CartTable cart={cart} setCart={setCart} className="sm:max-w-[80%] lg:max-w-[60%] mx-auto"/>
        <div className='sm:max-w-[80%] lg:max-w-[60%] mx-auto bottom-0 fixed left-0 right-0 px-4 sm:px-0'>
          <CartAction cart={cart} setCart={setCart}/>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Cart
