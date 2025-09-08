import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import UserProfile from "./pages/UserProfile";
import CheckoutPage from "./pages/CheckoutPage";
import Page_Product_Detail from './pages/Page_Product_Detail'
import Page_Product_List from './pages/Page_Product_List'
import Order_History_List from './pages/Order_History_List'
import Order_History_Detail from './pages/Order_History_Detail'

import OrderConfirmationMessage from "./components/atoms/OrderConfirmationMessage";
import ShippingAddress from "./components/atoms/ShippingAddress";
import Cart from "./pages/Cart";

import Orderconfirm from "./pages/OrderconfirmPage";
import { AddProductPage } from "./pages/AddProductPage";


import { useContext } from "react";
import { ValueContext } from "./context/ValueContext";
import { Toaster } from "sonner";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route
          path="/OrderConfirmationMessage"
          element={<OrderConfirmationMessage />}
        />
        <Route path="/ShippingAddress" element={<ShippingAddress />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orderconfirm" element={<Orderconfirm />} />
        <Route path="/AddProductPage" element={<AddProductPage />} />
        <Route path="/pageproductdetail" element={<Page_Product_Detail />} />
        <Route path="/pageproductlist" element={<Page_Product_List />} />
        <Route path="/orderhistorylist" element={<Order_History_List />} />
        <Route path="/orderhistorydetail" element={<Order_History_Detail />} />

        {/* TODO: category pages, product detail, cart, etc. */}
      </Routes>
      <Toaster position="top-center" expand={true} toastOptions={{
          style: {
            fontSize: '16px', 
          padding: '16px',
          fontFamily: 'Poppins',
          backgroundColor: 'var(--color-off-white)',
            color: 'var(--color-charcoal)'
          },
        }}/>
    </BrowserRouter>
  );
}
