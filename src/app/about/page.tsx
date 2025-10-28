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
      <main>
        <h1 className="sr-only">About Austin Hardy</h1>
        <div className="spline-container">
          <SplineScene />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
