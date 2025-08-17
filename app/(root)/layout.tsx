import Navbar from "@/components/navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative bg-light-900 dark:bg-dark-100">
      <Navbar />
      <div className="flex min-h-screen flex-1 flex-col background-light850_dark100 px-6 pb-6 pt-36">
        {children}
      </div>
    </main>
  );
};

export default Layout;
