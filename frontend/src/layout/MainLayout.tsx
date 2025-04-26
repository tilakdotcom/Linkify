import { rootBGPng } from "@/assets";
import Footer from "@/components/app-ui/Footer";
import Header from "@/components/app-ui/Header";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

export function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const storedLimit = localStorage.getItem("publicAccessWithLimit");
    if (!storedLimit) {
      localStorage.setItem("publicAccessWithLimit", "0");
    }
  }, []);
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default function MainLayout() {
  return (
    <main
      className={`relative overflow-hidden bg-cover  `}
      style={{
        backgroundImage: `url(${rootBGPng})`,
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <RootLayout>
        <Outlet />
      </RootLayout>
    </main>
  );
}
