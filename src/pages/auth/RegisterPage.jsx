import Navbar from "../../components/organisms/Navbar";
import Footer from "../../components/organisms/Footer";
import AuthCard from "../../components/organisms/AuthCard";
import FormField from "../../components/molecules/FormField";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <div className="py-16">
        <AuthCard title="Register">
          <FormField label="Name"><Input placeholder="Your name" /></FormField>
          <FormField label="Email"><Input type="email" placeholder="you@email.com" /></FormField>
          <FormField label="Password"><Input type="password" /></FormField>
          <FormField label="Confirm Password"><Input type="password" /></FormField>
          <Button className="w-full mt-2">Register</Button>
        </AuthCard>
      </div>
      <Footer />
    </>
  );
}
