// app/cryto/page.tsx
"use client";
import { Button, Grid } from "@mui/material";
import Image from "next/image";

import Footer from "../_components/_site/Footer";
import HomeBar from "../_components/_site/Homebar";
import "../_components/_styles/global.css";

import trail from "./_assets/cbtb.png";
import dao from "./_assets/dao.gif";
import gaad from "./_assets/gaad-poap.gif";
import ledger from "./_assets/ledger.png";
import mint from "./_assets/mint.gif";

const web3Data = [
  {
    title: "#LIVECRYPTO",
    link: "https://www.coinbase.com/livecrypto",
    image: "",
    button: true,
  },
  {
    title: "Trailblazer",
    link: "https://opensea.io/assets/matic/0xb62c2b82a8fe234c96ab1a4c9d50305fd19ef079/259",
    image: trail,
  },
  {
    title: "Ledger",
    link: "https://opensea.io/assets/matic/0xb62c2b82a8fe234c96ab1a4c9d50305fd19ef079/376",
    image: ledger,
  },
  {
    title: "DAO",
    link: "https://opensea.io/assets/matic/0xc94a4a1a6c12f9c9f56894ba00d99f766a800e39/0",
    image: dao,
  },
  {
    title: "#MintMadness",
    link: "https://opensea.io/assets/matic/0xc94a4a1a6c12f9c9f56894ba00d99f766a800e39/2",
    image: mint,
  },
  { title: "#GAAD", link: "https://app.poap.xyz/token/6633244", image: gaad },
];

const CryptoPage = () => {
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
          padding: "1rem",
        }}
      >
        <Grid container spacing={1}>
          {web3Data.map((project, index) => (
            <Grid key={index} item xs={6} sm={5} md={4} lg={3} xl={2}>
              <div
                className="projects-card bg-blur"
                onClick={() => window.open(project.link)}
              >
                {project.button ? (
                  <Button variant="contained" color="primary">
                    <h3>{project.title}</h3>
                  </Button>
                ) : (
                  <>
                    <div className="image-container">
                      <div className="projects-subtitle">
                        <h4>{project.title}</h4>
                      </div>
                      <Image alt="" className="proj-logo" src={project.image} />
                    </div>
                  </>
                )}
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default CryptoPage;
