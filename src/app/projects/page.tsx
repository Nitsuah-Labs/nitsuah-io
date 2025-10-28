// PROJECTS - src/app/projects/pages.tsx
"use client";
import Footer from "../_components/_site/Footer";
import HomeBar from "../_components/_site/Homebar";
import PortfolioGrid from "../_components/_site/PortfolioGrid";
import SelectedProjects from "../_components/_site/SelectedProjects";
import "../_components/_styles/SelectedProjects.css";
import "../_components/_styles/global.css";

const Projects = () => {
  return (
    <div className="App">
      <HomeBar />
      <div
        className="content-container"
        style={{
          marginTop: "64px",
          marginBottom: "60px",
          overflowY: "auto",
          height: "calc(100vh - 124px)",
        }}
      >
        <SelectedProjects />
        <PortfolioGrid />
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default Projects;
