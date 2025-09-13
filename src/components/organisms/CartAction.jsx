import React, { useState, useEffect,useContext } from "react";
import CheckboxWithText from "../atoms/CheckboxWithText";
import Button from "../atoms/Button";
import { ValueContext } from "../../context/ValueContext";
import { Link } from "react-router-dom";


const CartAction = ({ className = "" }) => {
  const {cart, setCart,setCheckoutItem,checkoutItem,installChecked, setInstallChecked, removeChecked} = useContext(ValueContext)
  const [total, setTotal] = useState(0);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  useEffect(() => {
    let sum = cart.reduce((accum, item) => {
      return accum + (item.checked ? item.price * item.quantity : 0);
    }, 0);

    if (installChecked) {
      sum += 200;
    }
    setTotal(sum);
    console.log(cart)
  }, [cart, installChecked]);
  //console.log(total)

  const handleDeleteCartItem = async (cart) => {
    //setCart([])
    await removeChecked(cart);
  };

  const handleInstallationChecked = () => {
    setInstallChecked(!installChecked);
  };

  const handleSelectAll = (event) => {
    setSelectAllChecked(!selectAllChecked);
    const updatedCart = cart.map((item) => ({ ...item, checked: !selectAllChecked }));
    //setCheckoutItem(updatedCart.filter(item => item.checked));

    //setCart(prevCart => prevCart.map(item => ({ ...item, checked: !selectAllChecked })))
    
    setCart(updatedCart)
    setCheckoutItem(updatedCart.filter(item => item.checked));

  };

  return (
    <div className={`border rounded-2xl border-sandy-beige overflow-hidden shadow-[0_2px_4px_rgba(178,_150,_116,_1)] p-2 sm:px-4 bg-white ${className}`}>
      <div className="flex sm:justify-end px-2 sm:px-4 pt-4 pb-2 border-b border-gray-400">
        <CheckboxWithText
          name="install"
          text="บริการประกอบสินค้าแบบเหมา 200 บาท"
          className="text-end"
          onChange={handleInstallationChecked}
          checked={installChecked}
        />
      </div>
      <div className="flex justify-between py-2 sm:mx-4 mx-2">
        <div className="flex my-4">
          <CheckboxWithText
            name="selectAll"
            text="ทั้งหมด"
            className="my-3"
            setCart={setCart}
            cart={cart}
            checked={selectAllChecked}
            onChange={handleSelectAll}
          />
          <Button
            variant="secondary"
            className="p-2 mx-4 inline-flex"
            onClick={() => handleDeleteCartItem(cart)}
            //disabled={!cart.some((i) => i.checked)}
          >
            ลบที่เลือก
          </Button>
        </div>

        <div className="flex">
          <p className="mr-4 my-5 hidden sm:block">ยอดรวม ฿{total}</p>
          <p className="mr-2 my-5 sm:hidden">฿{total}</p>
          <Link to ="/checkout">
          <Button variant="primary" className="py-2 px-3 my-2">
            เริ่มการสั่งซื้อ
            </Button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default CartAction;


//p-4 my-2
