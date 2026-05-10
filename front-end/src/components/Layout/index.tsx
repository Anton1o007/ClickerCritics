import type { FC } from "react";
import React from "react";
import Navbar from "./Navbar";
import { Main } from "./styles";
import "react-toastify/dist/ReactToastify.css";
import RenewSessionPopup from "./RenewSessionPopup";
import Footer from "./Footer";
import Head from "next/head";

export type Props = {
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>ClickerCritics</title>
        <link rel="icon" href="/images/clicker_critics_logo.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      <Navbar />
      <Main>{children}</Main>
      <RenewSessionPopup />
      <Footer />
    </>
  );
};

export default Layout;
