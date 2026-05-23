import React from "react";
import styles from "./HeroSection.module.css";

/**
 * Landing Hero - Simplified intro for home page
 * No scroll indicator, no scroll effects, just clean intro + CTA
 */
export const LandingHero: React.FC = () => {
  return (
    <section className={styles.landingHero}>
      <div className={styles.heroBackdrop} aria-hidden="true" />
      <div className={styles.landingContent}>
        <div className={styles.landingTagline}></div>

        <h1 className={styles.landingTitle}>
          Austin J. Hardy
          <br />
          Senior Systems Engineer
          <br />
          <span className={styles.highlight}>SaaS | AI | Web3</span>
        </h1>

        <p className={styles.landingDescription}>
          I build intelligent systems that translate human intent into AI
          execution. Currently working on multi-agent orchestration, repository
          intelligence, and blockchain applications.
        </p>
      </div>
    </section>
  );
};
