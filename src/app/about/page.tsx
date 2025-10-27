// ABOUT - src/app/pages/about.tsx
import React from 'react';
import HomeBar from '../_components/_site/Homebar';
import Footer from '../_components/_site/Footer';
import SplineScene from '../_components/_spline/spline-about';


const AboutPage: React.FC = () => {
  return (
    <div className="App">
      <div className="header">
        <HomeBar />
        <h2>ABOUT ME</h2>
      </div>
      <div className="spline-container">
        <SplineScene />
        <h4>May take some time to load, thanks for your patience!</h4>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;