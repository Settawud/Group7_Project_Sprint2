import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import UserDataForm from "./components/organisms/UserDataForm";
import ProfileImageUploader from "./components/atoms/UserProfile";
import UserProfile from "./components/atoms/UserProfile";
import OrderConfirmationMessage from "./components/atoms/OrderConfirmationMessage";
import ShippingAddress from "./components/atoms/ShippingAddress";

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

        {/* TODO: category pages, product detail, cart, etc. */}
      </Routes>
    </BrowserRouter>
  );
}
