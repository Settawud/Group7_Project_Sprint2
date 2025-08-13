import Navbar from "../../components/organisms/Navbar";
import Footer from "../../components/organisms/Footer";
import AuthCard from "../../components/organisms/AuthCard";
import FormField from "../../components/molecules/FormField";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="py-16">
        <AuthCard title="Login" footer={<p>Don’t have an account? <a href="/register" className="underline">Register</a></p>}>
          <FormField label="Email"><Input type="email" placeholder="you@email.com" /></FormField>
          <FormField label="Password"><Input type="password" placeholder="••••••••" /></FormField>
          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center gap-2"><input type="checkbox" /> Remember me</label>
            <a href="/forgot" className="underline">forget password?</a>
          </div>
          <Button className="w-full mt-2">Login</Button>
        </AuthCard>
      </div>
      <Footer />
    </>
  );
}
