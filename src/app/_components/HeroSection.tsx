"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ScrollIndicator } from "../../components/ui/ScrollIndicator";
import { useDelayedVisibility, useScrollOpacity } from "../../hooks";
import styles from "./HeroSection.module.css";

export const HeroSection: React.FC = () => {
  const opacity = useScrollOpacity(300);
  const showScrollHint = useDelayedVisibility(2000);
  const [displayedText, setDisplayedText] = useState("nitsuah");
  const [typingComplete, setTypingComplete] = useState(false);

  // Auto-type animation after 1.5 seconds
  useEffect(() => {
    const startTyping = setTimeout(() => {
      const fullName = "Austin H.";
      let currentIndex = 0;
      setDisplayedText("");

      const typeInterval = setInterval(() => {
        if (currentIndex < fullName.length) {
          setDisplayedText(fullName.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setTypingComplete(true);
        }
      }, 100);

      return () => clearInterval(typeInterval);
    }, 1500);

    return () => clearTimeout(startTyping);
  }, []);

  const heroScale = 1 + (1 - opacity) * 0.1;

  return (
    <section
      className={styles.hero}
      style={{
        opacity,
        transform: `scale(${heroScale})`,
        zIndex: opacity > 0.01 ? 5 : -1,
        pointerEvents: opacity < 0.5 ? "none" : "auto",
      }}
    >
      <div className={styles.content}>
        <div className={styles.greeting}>Hi, I&apos;m</div>

        <h1 className={styles.name}>
          {displayedText}
          {!typingComplete && <span className={styles.cursor}>|</span>}
        </h1>

        <p className={styles.tagline}>
          Building the future, one line at a time.
          <br />
          Developer Productivity Engineer | Web3 Researcher
        </p>

        <div className={styles.cta}>
          <Link href="/projects" className={styles.primaryButton}>
            Explore My Work
          </Link>
          <Link href="/about" className={styles.secondaryButton}>
            About Me
          </Link>
        </div>
      </div>

      <ScrollIndicator isVisible={showScrollHint && opacity > 0.5} />
    </section>
  );
};
