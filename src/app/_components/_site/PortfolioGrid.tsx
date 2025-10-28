import InfoIcon from "@mui/icons-material/Info";
import { Grid, Tooltip } from "@mui/material";
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

      <Grid container spacing={3}>
        {portfolioProjects.map((project) => {
          const image = projectImages[project.id] || cat;
          const primaryLink =
            project.demo || project.externalLink || project.github;

          return (
            <Grid key={project.id} item xs={12} sm={6} md={4} lg={3}>
              <div className="portfolio-card">
                <div
                  className="portfolio-card-image"
                  onClick={() =>
                    primaryLink && window.open(primaryLink, "_blank")
                  }
                >
                  <Image
                    alt={project.title}
                    src={image}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="portfolio-card-content">
                  <h3 className="portfolio-card-title">{project.title}</h3>

                  {project.description && (
                    <p className="portfolio-card-description">
                      {project.description}
                    </p>
                  )}

                  {project.tags && project.tags.length > 0 && (
                    <div className="portfolio-card-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="portfolio-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="portfolio-card-links">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-link portfolio-link-primary"
                      >
                        View Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-link"
                      >
                        GitHub
                      </a>
                    )}
                    {!project.demo &&
                      !project.github &&
                      project.externalLink && (
                        <a
                          href={project.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="portfolio-link portfolio-link-primary"
                        >
                          View Project
                        </a>
                      )}
                    {project.infoUrl && (
                      <Tooltip
                        title={
                          project.infoText ||
                          `Learn more about ${project.title}`
                        }
                        placement="top"
                        arrow
                      >
                        <a
                          href={project.infoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="portfolio-link"
                        >
                          <InfoIcon sx={{ fontSize: 16 }} />
                        </a>
                      </Tooltip>
                    )}
                  </div>
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
