import React from "react";
import ProfileData from "../components/organisms/ProfileData";
import UserAddress from "../components/organisms/UserAddress";
import Navbar from "../components/organisms/Navbar";
import AddressCard from "../components/molecules/AddressCard";
import AddressList from "../components/molecules/AddressList";
import AddressForm from "../components/molecules/AddressForm";
import NavUserMenu from "../components/organisms/NavUserMenu";

export default function UserProfile() {
  return (
    <div>
    <Navbar />
    <div className="min-h-screen bg-[#faf6f1] py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        <ProfileData />
        <UserAddress />
      </div>
    </div>
    </div>
  );
}

