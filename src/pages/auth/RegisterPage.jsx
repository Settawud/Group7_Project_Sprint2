import Navbar from "../../components/organisms/Navbar";
import Footer from "../../components/organisms/Footer";
import AuthCard from "../../components/organisms/AuthCard";
import FormField from "../../components/molecules/FormField";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import { useContext, useState } from "react";
import { ValueContext } from "../../context/ValueContext";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { login } = useContext(ValueContext) || {};
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) return; // simple client check
    const fullName = `${firstName} ${lastName}`.trim() || (email?.split("@")[0] ?? "User");
    login?.({ name: fullName, email });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
      <div className="py-16">
        <AuthCard title="Register">
          <form onSubmit={onSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField label="First Name">
                <Input placeholder="First name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} required />
              </FormField>
              <FormField label="Last Name">
                <Input placeholder="Last name" value={lastName} onChange={(e)=>setLastName(e.target.value)} required />
              </FormField>
            </div>
            <FormField label="Email"><Input type="email" placeholder="you@email.com" value={email} onChange={(e)=>setEmail(e.target.value)} required /></FormField>
            <FormField label="Password"><Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required /></FormField>
            <FormField label="Confirm Password"><Input type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} required /></FormField>
            <Button className="w-full mt-2" type="submit">Register</Button>
          </form>
        </AuthCard>
      </div>
      </main>
      <Footer />
    </div>
  );
}
