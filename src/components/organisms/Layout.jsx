import React from "react";
import Header from "@/components/organisms/Header";
import BottomNavigation from "@/components/organisms/BottomNavigation";
import KeyFeatures from "@/components/molecules/KeyFeatures";
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-6">
        {children}
      </main>
      
      <KeyFeatures />
      <BottomNavigation />
    </div>
  );
};

export default Layout;