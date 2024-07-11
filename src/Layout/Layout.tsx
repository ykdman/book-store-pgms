import React, { memo } from "react";
import Headers from "../shared/components/Header/Headers";
import Footer from "../shared/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Headers />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default memo(Layout);
