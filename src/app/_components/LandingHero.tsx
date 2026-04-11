import React from "react";
import Link from "next/link";
import styles from "./HeroSection.module.css";

/**
 * Landing Hero - Simplified intro for home page
 * No scroll indicator, no scroll effects, just clean intro + CTA
 */
export const LandingHero: React.FC = () => {
  return (
    <section className={styles.landingHero}>
      <div className={styles.landingContent}>
        <div className={styles.landingTagline}>
          <span className={styles.badge}>Austin Hardin</span>
        </div>

        <h1 className={styles.landingTitle}>
          Developer Productivity Engineer
          <br />
          <span className={styles.highlight}>Building the Future with AI & Web3</span>
        </h1>

        <p className={styles.landingDescription}>
          I create intelligent systems that bridge human intent and AI execution. Currently working 
          on multi-agent orchestration, repository intelligence, and blockchain applications.
        </p>

        <div className={styles.landingCTA}>
          <Link href="/projects" className={styles.primaryButton}>
            Explore Projects
          </Link>
          <a
            href="https://github.com/nitsuah"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryButton}
          >
            GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
};
