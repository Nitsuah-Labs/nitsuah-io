// src/app/profile/pages.tsx
import React from 'react';
import HomeBar from '../_components/Homebar';
import Footer from '../_components/Footer';

const MintSite: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <HomeBar />
        </div>
        <div className="middle-row">
            <p>PROFILE PAGE</p>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MintSite;
