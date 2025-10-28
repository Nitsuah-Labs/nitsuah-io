// ABOUT - src/app/pages/about.tsx
import React from "react";
import Footer from "../_components/_site/Footer";
import HomeBar from "../_components/_site/Homebar";
import SplineScene from "../_components/_spline/spline-about";

const AboutPage: React.FC = () => {
  return (
    <div className="App">
      <div className="header-fixed">
        <HomeBar />
        <h2 style={{ margin: "1rem 0", position: "relative", zIndex: 100 }}>
          ABOUT ME
        </h2>
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
