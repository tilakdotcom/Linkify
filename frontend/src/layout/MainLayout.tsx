import { rootBGPng } from "@/assets";
import Header from "@/components/common/Header";
import React from "react";
import { Outlet } from "react-router-dom";

export function RootLayout({ children }: { children: React.ReactNode }) {
  return <>
  <Header />
  {children}
  
  
  </>;
}

export default function MainLayout() {
  return (
    <main
      className={`relative overflow-hidden bg-cover `}
      style={{
        backgroundImage: `url(${rootBGPng})`,
        height: "100vh",
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
