// src/app/pages.tsx
import React from 'react';
import HomeBar from './_components/Homebar';
import Footer from './_components/Footer';
import SplineScene from './_components/spline-home';

const Pages: React.FC = () => {
  return (
    <div className="App">
        <div className="header">
          <HomeBar />
        </div>
        <div className="spline-container">
          <SplineScene />
        </div>
        <Footer />
      </div>
  );
};

export default Pages;
