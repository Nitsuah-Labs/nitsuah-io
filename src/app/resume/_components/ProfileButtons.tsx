"use client";

import React, { useState } from "react";
import { ResumeData } from "../../../types/resume";
import styles from "./ProfileButtons.module.css";

interface ProfileButtonsProps {
  url?: string;
  website?: string;
  profiles: ResumeData["basics"]["profiles"];
}

export const ProfileButtons: React.FC<ProfileButtonsProps> = ({
  url,
  website,
  profiles,
}) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const getProfileIcon = (network: string): string => {
    const icons: { [key: string]: string } = {
      GitHub: "🐙",
      LinkedIn: "💼",
      Twitter: "🐦",
      X: "✖️",
      Mastodon: "🐘",
      Email: "📧",
      Website: "🌐",
    };
    return icons[network] || "🔗";
  };

  const getProfileColor = (network: string): string => {
    const colors: { [key: string]: string } = {
      GitHub: "#333",
      LinkedIn: "#0077b5",
      Twitter: "#1da1f2",
      X: "#000",
      Mastodon: "#6364ff",
      Email: "#ea4335",
      Website: "#f97316",
    };
    return colors[network] || "#6b7280";
  };

  return (
    <div className="resume-profiles">
      {/* Website Button */}
      {(url || website) && (
        <a
          href={url || website}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.profileButton}
          aria-label="Personal website"
          style={{
            background: hoveredButton === "website" ? "#ea580c" : "#f97316",
            borderColor: hoveredButton === "website" ? "#c2410c" : "#ea580c",
            transform:
              hoveredButton === "website"
                ? "translateY(-2px)"
                : "translateY(0)",
            boxShadow:
              hoveredButton === "website"
                ? "0 4px 12px rgba(249, 115, 22, 0.4)"
                : "none",
          }}
          onMouseEnter={() => setHoveredButton("website")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <span className={styles.icon}>🌐</span>
          <span>Website</span>
        </a>
      )}

      {/* Profile Buttons */}
      {profiles &&
        profiles.map((profile, idx) => (
          <a
            key={idx}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.profileButton}
            aria-label={`${profile.network} profile`}
            style={{
              background:
                hoveredButton === profile.network
                  ? getProfileColor(profile.network)
                  : "transparent",
              borderColor: getProfileColor(profile.network),
              transform:
                hoveredButton === profile.network
                  ? "translateY(-2px)"
                  : "translateY(0)",
              boxShadow:
                hoveredButton === profile.network
                  ? `0 4px 12px ${getProfileColor(profile.network)}40`
                  : "none",
            }}
            onMouseEnter={() => setHoveredButton(profile.network)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <span className={styles.icon}>
              {getProfileIcon(profile.network)}
            </span>
            <span>{profile.network}</span>
          </a>
        ))}
    </div>
  );
};
