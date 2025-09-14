import React, { useContext } from 'react'
import CartItem from '../molecules/CartItem'
import { ValueContext } from "../../context/ValueContext";


const CartTable = ({ className }) => {
  
  const {cart} = useContext(ValueContext)
  
  return (
      <div className={`mb-4 border rounded-2xl overflow-hidden border-sandy-beige shadow-[0_2px_4px_rgba(178,_150,_116,_1)] ${className}`}>
      <div className='overflow-y-auto'>   
      <table className="w-full sm:table-fixed mx-auto bg-white">
              <thead className="hidden sm:contents w-full">
                <th className="p-4 sm:w-1/10 sm:border-b sm:border-charcoal">เลือก</th>
                <th className="py-4 px-2 sm:w-15/100 sm:border-b sm:border-charcoal">รูปสินค้า</th>
                <th className="p-4 sm:w-40/100 sm:border-b sm:border-charcoal">ชื่อสินค้า</th>
                <th className="p-4 sm:w-15/100 sm:border-b sm:border-charcoal">จำนวน</th>
                <th className="p-4 sm:w-20/100 sm:border-b sm:border-charcoal sm:min-w-6">ราคารวม</th>
              </thead>
              <tbody className="divide-y divide-gray-300">
                  {cart.map((item, index) => (
                      <CartItem key={item.variantId} item={item}/>
                  ))}
              </tbody>
        </table>
        </div> 
    </div>
  )
}

export default CartTable