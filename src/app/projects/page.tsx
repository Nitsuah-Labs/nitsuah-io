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
      <main
        className="content-container"
        style={{
          marginTop: "80px", // Increased from 64px
          marginBottom: "60px",
          paddingBottom: "80px", // Footer spacing buffer
          overflowY: "auto",
          height: "calc(100vh - 140px)", // Adjusted for increased margin
        }}
      >
        <h1 className="sr-only">Projects Portfolio</h1>
        <SelectedProjects />
        <PortfolioGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
