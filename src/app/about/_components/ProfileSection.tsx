"use client";

import Image from "next/image";
import React from "react";
import { ScrollIndicator } from "../../../components/ui/ScrollIndicator";
import { useDelayedVisibility, useScrollOpacity } from "../../../hooks";
import arf from "../../_components/_labs/_assets/arf.png";
import styles from "./ProfileSection.module.css";

export const ProfileSection: React.FC = () => {
  const opacity = useScrollOpacity(300);
  const showScrollHint = useDelayedVisibility(2000);

  return (
    <section
      className={styles.section}
      style={{ opacity, zIndex: opacity > 0.01 ? 5 : -1 }}
    >
      <div className={styles.content}>
        <h2 className={styles.title}>About Me</h2>

        <div className={styles.profileImage}>
          <Image
            src={arf}
            alt="Austin Hardy Profile"
            width={150}
            height={150}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={styles.bio}>
          <p>
            I&apos;m a{" "}
            <strong className={styles.highlight}>
              Developer Productivity Engineer
            </strong>{" "}
            and <strong className={styles.highlight}>Researcher</strong>{" "}
            passionate about building tools that empower engineers to work
            smarter and systems to scale efficiently.
          </p>
          <p>
            With a focus on <strong>automation</strong>,{" "}
            <strong>developer experience</strong>, and{" "}
            <strong>Web3 innovation</strong>, I create solutions that bridge the
            gap between complex technology and practical implementation.
          </p>
          <p>
            When I&apos;m not coding, you&apos;ll find me working on my &apos;78
            Corvette or my &apos;81 Silverado truck, exploring classic
            automotive restoration and maintenance.
          </p>
        </div>

        <ScrollIndicator isVisible={showScrollHint && opacity > 0.5} />
      </div>
    </section>
  );
};
