import React from "react";
import styles from "./HeroSection.module.css";

/**
 * Landing Hero - Simplified intro for home page
 * No scroll indicator, no scroll effects, just clean intro + CTA
 */
export const LandingHero: React.FC = () => {
  return (
    <section className={styles.landingHero}>
      <div className={styles.landingContent}>
        <div className={styles.landingTagline}></div>

        <h1 className={styles.landingTitle}>
          Austin Hardy | Developer Productivity Engineer
          <br />
          <span className={styles.highlight}>AI + Web3 Systems</span>
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
