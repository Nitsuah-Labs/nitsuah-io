// src/app/logout/pages.tsx //TODO
import React from "react";
import HomeBar from "../_components/_site/Homebar";
import Footer from "../_components/_site/Footer";

const Logout: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <HomeBar />
        </div>
        <div className="middle-row">
          <p>LOGOUT PAGE</p>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Logout;
