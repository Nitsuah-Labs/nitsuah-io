// ABOUT - src/app/pages/about.tsx
import React from "react";
import Footer from "../_components/_site/Footer";
import HomeBar from "../_components/_site/Homebar";
import SplineScene from "../_components/_spline/spline-about";

const AboutPage: React.FC = () => {
  return (
    <div className="App">
      <div className="header">
        <HomeBar />
        <h2>ABOUT ME</h2>
      </div>
      <div className="spline-container">
        <SplineScene />
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;
