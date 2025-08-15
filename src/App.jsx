import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import UserDataForm from "./components/organisms/UserDataForm";
import ProfileImageUploader from "./components/atoms/UserProfile";
import UserProfile from "./components/atoms/UserProfile";

export default function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/userprofile" element={<UserProfile />} />
        
        {/* TODO: category pages, product detail, cart, etc. */}
      </Routes>
    </BrowserRouter>
  );
}
