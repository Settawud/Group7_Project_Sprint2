import Navbar from "../../components/organisms/Navbar";
import Footer from "../../components/organisms/Footer";
import AuthCard from "../../components/organisms/AuthCard";
import FormField from "../../components/molecules/FormField";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";

export default function ForgotPasswordPage() {
  return (
    <>
      <Navbar />
      <div className="py-16">
        <AuthCard title="Forget Password">
          <FormField label="Enter your Email">
            <Input type="email" placeholder="you@email.com" />
          </FormField>
          <Button className="w-full mt-2">Submit</Button>
        </AuthCard>
      </div>
      <Footer />
    </>
  );
}
