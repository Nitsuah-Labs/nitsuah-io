import InfoIcon from "@mui/icons-material/Info";
import { Grid, IconButton, Tooltip } from "@mui/material";
import Image from "next/image";
import React from "react";
import { portfolioProjects } from "../../../lib/data/projects";

// Import project images
import dev from "../../crypto/_assets/dao.png";
import nitsuah from "../../projects/_assets/NITSUAH.png";
import aiarf from "../../projects/_assets/arf-ai.png";
import arfg from "../../projects/_assets/arf-guild.gif";
import arf from "../../projects/_assets/arf.gif";
import blendeth from "../../projects/_assets/blend-eth.gif";
import buildspace from "../../projects/_assets/buildspace.png";
import cat from "../../projects/_assets/cat.png";
import darkmoon from "../../projects/_assets/darkmoon.gif";
import polyens from "../../projects/_assets/ens.gif";
import hedge from "../../projects/_assets/hedge-ref.png";
import ngx from "../../projects/_assets/ng-game.png";
import nwb from "../../projects/_assets/nights+weekends.png";
import solApp from "../../projects/_assets/sol-dapp.gif";
import solPay from "../../projects/_assets/sol-store.gif";
import solana from "../../projects/_assets/solana-logo.png";
import spline from "../../projects/_assets/spline.gif";
import web3intro from "../../projects/_assets/web3-intro.png";
import web3mint from "../../projects/_assets/web3-mint.png";

// Map project IDs to their images
const projectImages: Record<string, any> = {
  github: cat,
  labs: nitsuah,
  darkmoon: darkmoon,
  spline3d: spline,
  nextgen: ngx,
  clients: cat,
  buildspace: buildspace,
  "ens-nft": polyens,
  "nft-store": solPay,
  "nft-game": hedge,
  "nights-weekends": nwb,
  "eth-dapp": web3mint,
  "sol-dapp": solApp,
  blender: blendeth,
  autogpt: arf,
  "eth-core": web3intro,
  devdao: dev,
  "sol-core": solana,
  paint3d: arfg,
  imagen: aiarf,
};

const PortfolioGrid: React.FC = () => {
  return (
    <section className="portfolio-grid" style={{ marginTop: "40px" }}>
      <div className="projects-header" style={{ marginBottom: "24px" }}>
        <h2>More Projects & Experiments</h2>
        <p>Additional work, experiments, and learning projects</p>
      </div>

      <Grid container spacing={1}>
        {portfolioProjects.map((project) => {
          const image = projectImages[project.id] || cat;
          const link =
            project.externalLink || project.demo || project.github || "#";

          return (
            <Grid key={project.id} item xs={6} sm={5} md={4} lg={3} xl={2}>
              <div className="projects-card bg-blur">
                <div className="projects-subtitle shadow">
                  <h4>{project.title}</h4>
                </div>
                <div className="image-container">
                  <Image
                    alt={project.title}
                    className="proj-logo"
                    src={image}
                    onClick={() => window.open(link, "_blank")}
                    style={{ cursor: "pointer" }}
                  />
                  {project.infoUrl && (
                    <div className="tooltip-container">
                      <Tooltip
                        title={project.infoText || `Explore ${project.title}`}
                        placement="top-end"
                        arrow
                        style={{ transform: "translateX(8px)" }}
                      >
                        <IconButton
                          style={{ color: "white" }}
                          onClick={() => window.open(project.infoUrl, "_blank")}
                          aria-label={`Learn more about ${project.title}`}
                        >
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  )}
                </div>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
};

export default PortfolioGrid;
