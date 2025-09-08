import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Navbar from "../../components/organisms/Navbar";
import Footer from "../../components/organisms/Footer";
import AuthCard from "../../components/organisms/AuthCard";
import FormField from "../../components/molecules/FormField";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import { toast } from "sonner";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [attempted, setAttempted] = useState(false);

  const passwordError = useMemo(() => {
    if (!attempted) return "";
    return password.length >= 6 ? "" : "Password must be at least 6 characters";
  }, [password, attempted]);

  const confirmError = useMemo(() => {
    if (!attempted) return "";
    return confirm === password ? "" : "Passwords do not match";
  }, [confirm, password, attempted]);

  const disabled = submitting; // allow submit attempt to trigger errors

  useEffect(() => {
    setError("");
  }, [password, confirm]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setAttempted(true);
    if (!token) {
      setError("Invalid or expired link (missing token)");
      return;
    }
    if (passwordError || confirmError) {
      setError("Please fix the errors above");
      return;
    }
    try {
      setSubmitting(true);
      const API_BASE = import.meta.env.VITE_API_BASE || "";
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Reset password failed");
      setSuccess("Password reset successful! Please sign in with your new password.");
      toast.success("Password reset successful");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="py-16">
          <AuthCard
            title="Reset Password"
            footer={<p>Remember your password? <Link to="/login" className="underline">Sign in</Link></p>}
          >
            {!token && (
              <p className="text-sm text-red-600">Reset token not found. Please request a new email from the forgot password page.</p>
            )}
            <form onSubmit={onSubmit} className="space-y-3">
              <FormField label="New password" hint="At least 6 characters" error={passwordError}>
                <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" minLength={6} />
              </FormField>
              <FormField label="Confirm password" error={confirmError}>
                <Input type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} placeholder="••••••••" minLength={6} />
              </FormField>
              {error && <div className="text-sm text-red-600">{error}</div>}
              {success && <div className="text-sm text-green-600">{success}</div>}
              <Button className="w-full mt-2" type="submit" disabled={disabled}>{submitting ? "Updating..." : "Confirm Reset"}</Button>
            </form>
          </AuthCard>
        </div>
      </main>
      <Footer />
    </div>
  );
}
