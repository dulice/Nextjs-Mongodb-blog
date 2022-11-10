import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Navigation = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Navigation;
