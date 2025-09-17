import React, { useContext, useState } from 'react'
import CartTable from '../components/organisms/CartTable';
import CartAction from '../components/organisms/CartAction';
import { ValueContext } from '../context/ValueContext';
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import { useEffect } from 'react';
import { api } from '../lib/api';


const Cart = () => {

  const { cart, setCart } = useContext(ValueContext)

  // const getProduct = async (productId, variantId) => {
  //   try {
  //     const productData = await api.get(`/products/${productId}`)
  //     const product = productData.data.item
  //     const variant = product.variants.find(variant => variant._id === variantId)

  //     if (!variant) {
  //       //console.warn(`Variant ${variantId} not found for product ${productId}`);
  //       console.warn(`Variant not found for product `);
  //     return null; 
  //   }
  //     const colorData = await api.get(`/colors/${variant.colorId}`)

  //     return [product.name, variant, colorData.data.item.name_en]
  //         } catch (error) {
  //           console.error(`Error fetching details for product:`, error);
  //           return null;
            
  //         }
  //       }
  
  useEffect(() => {
    async function fetchCart() {
      try {
          
        const cartData = await api.get("/cart")
        
        const cart = cartData.data.cart.map(item => ({...item, checked: true, }));
        
        //console.log(cart)
        setCart(cart)
      }
      catch (error) {
        console.error("Failed to fetch cart:", error);
      
      }
    }
    fetchCart()
  }
    , [])

  return (
    <div className="min-h-screen flex flex-col bg-off-white">
      <Navbar />
      <main className="flex-1 p-4 relative">

        <CartTable cart={cart} setCart={setCart} className="sm:max-w-[80%] lg:max-w-[60%] mx-auto"/>
        <div className='sm:max-w-[80%] lg:max-w-[60%] mx-auto bottom-0 sticky left-0 right-0 px-4 sm:px-0'>
          <CartAction cart={cart} setCart={setCart}/>
        </div>
      </main>
      <Footer className="hidden sm:block" />
    </div>
  )
}

export default Cart
