// HOMEPAGE - src/app/page.tsx
import React from "react";
import Footer from "./_components/_site/Footer";
import HomeBar from "./_components/_site/Homebar";
import SplineScene from "./_components/_spline/spline-home";

const HomePage: React.FC = () => {
  return (
    <div className="App">
      <HomeBar />
      <main>
        <h1 className="sr-only">Welcome to Nitsuah Labs</h1>
        <div className="spline-container">
          <SplineScene />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
