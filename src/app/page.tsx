// HOMEPAGE - src/app/page.tsx
import React from 'react';
import HomeBar from './_components/_site/Homebar';
import Footer from './_components/_site/Footer';
import SplineScene from './_components/_spline/spline-home';

const HomePage: React.FC = () => {
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

export default HomePage;
