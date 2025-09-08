import Navbar from "../../components/organisms/Navbar";
import Footer from "../../components/organisms/Footer";
import AuthCard from "../../components/organisms/AuthCard";
import FormField from "../../components/molecules/FormField";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import { useContext, useMemo, useState } from "react";
import { ValueContext } from "../../context/ValueContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function RegisterPage() {
  const { login } = useContext(ValueContext) || {};
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const emailError = useMemo(() => {
    if (!attempted) return "";
    return /.+@.+\..+/.test(email) ? "" : "Invalid email";
  }, [email, attempted]);

  const passwordError = useMemo(() => {
    if (!attempted) return "";
    return password.length >= 6 ? "" : "Password must be at least 6 characters";
  }, [password, attempted]);

  const confirmError = useMemo(() => {
    if (!attempted) return "";
    return confirm === password ? "" : "Passwords do not match";
  }, [confirm, password, attempted]);

  const disabled = submitting; // allow attempt to trigger field errors

  const onSubmit = (e) => {
    e.preventDefault();
    setAttempted(true);
    if (!firstName || !lastName || !email || !password || !confirm) return;
    if (emailError || passwordError || confirmError) return;
    const fullName = `${firstName} ${lastName}`.trim() || (email?.split("@")[0] ?? "User");
    try {
      setSubmitting(true);
      // Mock register success (no backend call here)
      login?.({ name: fullName, email });
      toast.success("Registered successfully");
      navigate("/");
    } finally {
      setSubmitting(false);
    }
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
                <Input placeholder="First name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
              </FormField>
              <FormField label="Last Name">
                <Input placeholder="Last name" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
              </FormField>
            </div>
            <FormField label="Email" error={emailError}>
              <Input type="email" placeholder="you@email.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </FormField>
            <FormField label="Password" error={passwordError}>
              <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} minLength={6} />
            </FormField>
            <FormField label="Confirm Password" error={confirmError}>
              <Input type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} minLength={6} />
            </FormField>
            <Button className="w-full mt-2" type="submit" disabled={disabled}>{submitting ? "Registering..." : "Register"}</Button>
          </form>
        </AuthCard>
      </div>
      </main>
      <Footer />
    </div>
  );
}
