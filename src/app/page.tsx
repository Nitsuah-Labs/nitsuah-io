// HOMEPAGE - src/app/page.tsx
import React from 'react';
import HomeBar from './_components/_site/Homebar';
import Footer from './_components/_site/Footer';
import SplineScene from './_components/_spline/spline-home';
import SelectedProjects from './_components/_site/SelectedProjects';
import './_components/_styles/SelectedProjects.css';

const HomePage: React.FC = () => {
  return (
    <div className="App">
        <div className="header">
          <HomeBar />
        </div>
        <div className="spline-container">
          <SplineScene />
        </div>
        <SelectedProjects />
        <Footer />
      </div>
  );
};

export default HomePage;
