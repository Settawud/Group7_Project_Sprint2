import React from 'react'
import CheckboxWithText from '../atoms/CheckboxWithText'
import Button from '../atoms/Button'

const CartAction = ({ cart,setCart}) => {
    let total = cart.reduce((accum, item) => {
        if (item.checked) {
            return accum + item.price * item.quantity
        }
        else { return accum }
    }, 0)
    //console.log(total)
    
  return (
      <div className=" border rounded-2xl border-sandy-beige overflow-hidden shadow-[0_2px_4px_rgba(178,_150,_116,_1)] p-4">
          <div className='flex justify-end px-4 pt-4'>
              <CheckboxWithText name="install" text="บริการประกอบสินค้าแบบเหมา 200 บาท" className='text-end' />
          </div>
          <div className='flex py-4 justify-between'>
              <div>
                  <CheckboxWithText name="selectAll" text="เลือกทั้งหมด" className='mx-4 my-2' setCart={setCart} cart={cart} />
              <Button variant="secondary" className="p-4 font-semibold mx-4 my-2">ลบที่เลือก</Button>
              </div>
              <div>
                  <p className='mx-4'>ยอดรวม {total} บาท</p>
                  <Button variant="primary" className="p-4 font-semibold mx-4">เริ่มการสั่งซื้อ</Button>
                  </div>
          </div>

      </div>
  )
}

export default CartAction