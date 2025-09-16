import ProfileData from "../components/organisms/ProfileData";
import UserAddress from "../components/organisms/UserAddress";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import UserCoupon from "../components/molecules/UserCoupon";
import CouponCreateForm from "../components/molecules/CouponCreateForm";
import { useState } from "react";
import Sidebar from "../components/organisms/Sidebar";

export default function UserProfile() {
  const [couponRefreshKey, setCouponRefreshKey] = useState(0);
  return (
    <div className="min-h-screen flex flex-col bg-[#faf6f1]">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 py-10 px-4">
          <div className="max-w-4xl mx-auto space-y-10">
            <ProfileData />
            <UserAddress />
            <CouponCreateForm onCreated={() => setCouponRefreshKey((k)=>k+1)} />
            <UserCoupon refreshKey={couponRefreshKey} />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

