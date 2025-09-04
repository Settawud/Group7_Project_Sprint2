import Navbar from "../../components/organisms/Navbar";
import Footer from "../../components/organisms/Footer";
import AuthCard from "../../components/organisms/AuthCard";
import FormField from "../../components/molecules/FormField";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ValueContext } from "../../context/ValueContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(ValueContext) || {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const name = email?.split("@")[0] || "User";
    login?.({ name, email });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
      <div className="py-16">
        <AuthCard title="Login" footer={<p>Don’t have an account? <Link to="/register" className="underline">Register</Link></p>}>
          <form onSubmit={onSubmit} className="space-y-3">
            <FormField label="Email"><Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@email.com" required /></FormField>
            <FormField label="Password"><Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" required /></FormField>
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2"><input type="checkbox" /> Remember me</label>
              <Link to="/forgot" className="underline">forget password?</Link>
            </div>
            <Button className="w-full mt-2" type="submit">Login</Button>
          </form>
        </AuthCard>
      </div>
      </main>
      <Footer />
    </div>
  );
}
