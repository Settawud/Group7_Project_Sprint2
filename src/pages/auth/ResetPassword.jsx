import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Navbar from "../../components/organisms/Navbar";
import Footer from "../../components/organisms/Footer";
import AuthCard from "../../components/organisms/AuthCard";
import FormField from "../../components/molecules/FormField";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import { toast } from "sonner";
import { post } from "../../lib/api";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const emailParam = params.get("email") || "";
  const navigate = useNavigate();

  const [email, setEmail] = useState(emailParam);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    if (!email) {
      setError("Please enter your email");
      return;
    }
    const emailNorm = email.trim().toLowerCase();
    const validEmail = /.+@.+\..+/.test(emailNorm);
    if (!validEmail) {
      setError("Invalid email");
      return;
    }
    if (passwordError || confirmError) {
      setError("Please fix the errors above");
      return;
    }
    try {
      setSubmitting(true);
      const API_BASE = import.meta.env.VITE_API_BASE || "";
      if (!API_BASE) throw new Error("Backend not configured");
      await post("/auth/password/reset", { email: emailNorm, token, newPassword: password });
      setSuccess("Password reset successful! Please sign in with your new password.");
      toast.success("Password reset successful");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Something went wrong";
      setError(msg);
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
              {!emailParam && (
                <FormField label="Email" hint="Enter the email you used to request reset" error={emailError}>
                  <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@email.com" />
                </FormField>
              )}
              <FormField label="New password" hint="At least 6 characters" error={passwordError}>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={6}
                  right={
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="text-stone-500 hover:text-stone-700"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                />
              </FormField>
              <FormField label="Confirm password" error={confirmError}>
                <Input
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e)=>setConfirm(e.target.value)}
                  placeholder="••••••••"
                  minLength={6}
                  right={
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="text-stone-500 hover:text-stone-700"
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                      title={showConfirm ? "Hide password" : "Show password"}
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                />
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
