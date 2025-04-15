import React from "react";
import { Outlet } from "react-router-dom";

export function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default function MainLayout() {
  return (
    <main>
      <RootLayout>
        <Outlet />
      </RootLayout>
    </main>
  );
}
