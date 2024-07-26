import React, { memo } from "react";
import Headers from "../shared/components/Header/Headers";
import Footer from "../shared/components/Footer";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <>
      <Headers />
      <LayoutStyle>{children || <Outlet />}</LayoutStyle>
      <Footer />
    </>
  );
}

const LayoutStyle = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  padding: 20px 0;

  @media screen AND (${({ theme }) => theme.mediaQuery.mobile}) {
    padding: 20px 12px;
  }
`;

export default memo(Layout);
