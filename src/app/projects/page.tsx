// PROJECTS - src/app/projects/pages.tsx
"use client";
import InfoIcon from "@mui/icons-material/Info";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";
import Footer from "../_components/_site/Footer";
import HomeBar from "../_components/_site/Homebar";
import SelectedProjects from "../_components/_site/SelectedProjects";
import "../_components/_styles/SelectedProjects.css";
import "../_components/_styles/global.css";
import dev from "../crypto/_assets/dao.png";
import nitsuah from "./_assets/NITSUAH.png";
import aboutme from "./_assets/aboutme.jpg";
import aiarf from "./_assets/arf-ai.png";
import arfg from "./_assets/arf-guild.gif";
import arf from "./_assets/arf.gif";
import blendeth from "./_assets/blend-eth.gif";
import buildspace from "./_assets/buildspace.png";
import cat from "./_assets/cat.png";
import darkmoon from "./_assets/darkmoon.gif";
import polyens from "./_assets/ens.gif";
import hedge from "./_assets/hedge-ref.png";
import ngx from "./_assets/ng-game.png";
import nwb from "./_assets/nights+weekends.png";
import solApp from "./_assets/sol-dapp.gif";
import solPay from "./_assets/sol-store.gif";
import solana from "./_assets/solana-logo.png";
import spline from "./_assets/spline.gif";
import web3intro from "./_assets/web3-intro.png";
import web3mint from "./_assets/web3-mint.png";

const Projects = () => {
  const projectsData = [
    { title: "GitHub", image: cat, link: "https://github.com/nitsuah" },
    { title: "/labs", image: nitsuah, link: "/labs/" },
    { title: "darkmoon.dev", image: darkmoon, link: "https://darkmoon.dev" },
    { title: "3DX", image: spline, link: "/" },
    { title: "NEXTGEN", image: ngx, link: "https://nft.darkmoon.dev/play" },
    { title: "CLIENTS", image: cat, link: "/projects/clients" },
    {
      title: "Profile",
      image: buildspace,
      link: "https://buildspace.so/@nitsuah",
      btnUrl: "https://buildspace.so/join",
      btnTxt: "Join me! - https://buildspace.so/join",
    },
    {
      title: "ENS NFT",
      image: polyens,
      link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/18179",
      btnUrl: "https://buildspace.so/p/build-polygon-ens",
      btnTxt: "ENS NFT",
    },
    {
      title: "NFT Store",
      image: solPay,
      link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/19051",
      btnUrl: "https://buildspace.so/p/ship-solana-nft-collection",
      btnTxt: "NFT Store",
    },
    {
      title: "Spline3D",
      image: aboutme,
      link: "/about",
      btnUrl: "https://spline.design/",
      btnTxt: "https://spline.design/",
    },
    {
      title: "NFT Game",
      image: hedge,
      link: "",
      btnUrl: "https://buildspace.so/p/create-turn-based-nft-game",
      btnTxt: "NFT Game",
    },
    {
      title: "N+W S1",
      image: nwb,
      link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/22083",
      btnUrl: "https://buildspace.so/nw",
      btnTxt: "N+W S1",
    },
    {
      title: "ETH dApp",
      image: web3mint,
      link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/18857",
      btnUrl: "https://buildspace.so/p/mint-nft-collection",
      btnTxt: "ETH dApp",
    },
    {
      title: "SOL dApp",
      image: solApp,
      link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/19995",
      btnUrl: "https://buildspace.so/p/build-solana-web3-app",
      btnTxt: "SOL dApp",
    },
    {
      title: "Blender",
      image: blendeth,
      link: "https://www.youtube.com/watch?v=nIoXOplUvAw",
      btnUrl: "https://www.youtube.com/watch?v=nIoXOplUvAw",
      btnTxt: "Blender Tutorial",
    },
    {
      title: "AutoGPT",
      image: arf,
      link: "https://buildspace.so/@nitsuah",
      btnUrl: "https://buildspace.so/p/build-ai-writing-assistant-gpt3",
      btnTxt: "GPT3 Ai Ghost-Writer",
    },
    {
      title: "ETH Core",
      image: web3intro,
      link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/18457",
      btnUrl: "https://buildspace.so/p/build-solidity-web3-app",
      btnTxt: "ETH Core",
    },
    {
      title: "DevDAO",
      image: dev,
      link: "/labs/dao",
      btnUrl: "https://buildspace.so/p/build-dao-with-javascript",
      btnTxt: "Build a Dao with JS",
    },
    {
      title: "SOL Core",
      image: solana,
      link: "https://darkmoon.dev/about",
      btnUrl: "https://buildspace.so/p/solana-core",
      btnTxt: "Solana Core",
    },
    {
      title: "Paint3D",
      image: arfg,
      link: "https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/60508307908081726032856631071720531552206552958895219492912716482941726752788",
      btnUrl:
        "https://support.microsoft.com/en-us/windows/basic-3d-modeling-with-paint-3d-78a27393-4cc5-1c9a-5929-3b4644eb5a94",
      btnTxt: "Basic 3D modeling with Paint 3D",
    },
    {
      title: "ImaGen",
      image: aiarf,
      link: "/labs/imagen",
      btnUrl: "https://buildspace.so/p/build-ai-avatars",
      btnTxt: "Dream AI Avatars",
    },
  ];

  const renderProjsContainer = () => (
    <Grid container spacing={1}>
      {projectsData.map((project, index) => (
        <Grid key={index} item xs={6} sm={5} md={4} lg={3} xl={2}>
          <div className="projects-card bg-blur">
            <div className="projects-subtitle shadow">
              <h4>{project.title}</h4>
            </div>
            <div className="image-container">
              <Image
                alt={project.title}
                className="proj-logo"
                src={project.image}
                onClick={() => window.open(project.link)}
              />
              {/* Tooltip icon */}
              {project.btnUrl && (
                <div className="tooltip-container">
                  <Tooltip
                    title={`Explore ${project.title}`}
                    placement="top-end"
                    arrow
                    style={{ transform: "translateX(8px)" }} // Adjust the value as needed
                  >
                    <IconButton
                      style={{ color: "white" }}
                      onClick={() => window.open(project.btnUrl)}
                    >
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <div className="App">
      <div className="container">
        <div className="content-container">
          <div className="header">
            <HomeBar />
          </div>
          <SelectedProjects />
          <div className="projects-container">{renderProjsContainer()}</div>
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Projects;
