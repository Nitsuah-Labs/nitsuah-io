"use client";

import React, { useState } from "react";
import { ResumeData } from "../../../types/resume";
import styles from "./ProfileButtons.module.css";

interface ProfileButtonsProps {
  url?: string;
  website?: string;
  profiles: ResumeData["basics"]["profiles"];
  basics: ResumeData["basics"];
}

export const ProfileButtons: React.FC<ProfileButtonsProps> = ({
  url,
  website,
  profiles,
  basics,
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
      GitHub: "#7c3aed",
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
      {/* LinkedIn Button */}
      {profiles &&
        profiles
          .filter((p) => p.network === "LinkedIn")
          .map((profile, idx) => (
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
                    ? `0 4px 12px ${getProfileColor(profile.network)}66`
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

      {/* Email Button */}
      {basics?.email && (
        <a
          href={`mailto:${basics.email}`}
          className={styles.profileButton}
          aria-label="Email"
          style={{
            background: hoveredButton === "email" ? "#d32f2f" : "transparent",
            borderColor: "#ea4335",
            transform:
              hoveredButton === "email" ? "translateY(-2px)" : "translateY(0)",
            boxShadow:
              hoveredButton === "email"
                ? "0 4px 12px rgba(234, 67, 53, 0.4)"
                : "none",
          }}
          onMouseEnter={() => setHoveredButton("email")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <span className={styles.icon}>✉️</span>
          <span>Email</span>
        </a>
      )}

      {/* Location Button */}
      {basics?.location && (
        <a
          href={basics.location.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.profileButton}
          aria-label="Location"
          style={{
            background:
              hoveredButton === "location" ? "#388e3c" : "transparent",
            borderColor: "#4caf50",
            transform:
              hoveredButton === "location"
                ? "translateY(-2px)"
                : "translateY(0)",
            boxShadow:
              hoveredButton === "location"
                ? "0 4px 12px rgba(76, 175, 80, 0.4)"
                : "none",
            cursor: basics.location.url ? "pointer" : "default",
          }}
          onMouseEnter={() => setHoveredButton("location")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <span className={styles.icon}>📍</span>
          <span>
            {[
              basics.location.city,
              basics.location.region,
              basics.location.countryCode,
            ]
              .filter(Boolean)
              .join(", ")}
          </span>
        </a>
      )}

      {/* GitHub Button */}
      {profiles &&
        profiles
          .filter((p) => p.network === "GitHub")
          .map((profile, idx) => (
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
                    ? `0 4px 12px ${getProfileColor(profile.network)}66`
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

      {/* Website Button */}
      {(url || website) && (
        <a
          href={url || website}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.profileButton}
          aria-label="Personal website"
          style={{
            background: hoveredButton === "website" ? "#ea580c" : "transparent",
            borderColor: "#f97316",
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

      {/* Projects Button */}
      <a
        href="/projects"
        className={styles.profileButton}
        aria-label="View projects"
        style={{
          background: hoveredButton === "projects" ? "#ea580c" : "transparent",
          borderColor: "#f97316",
          transform:
            hoveredButton === "projects" ? "translateY(-2px)" : "translateY(0)",
          boxShadow:
            hoveredButton === "projects"
              ? "0 4px 12px rgba(249, 115, 22, 0.4)"
              : "none",
        }}
        onMouseEnter={() => setHoveredButton("projects")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <span className={styles.icon}>💼</span>
        <span>Projects</span>
      </a>

      {/* Other Profile Buttons (Twitter, etc.) */}
      {profiles &&
        profiles
          .filter((p) => p.network !== "LinkedIn" && p.network !== "GitHub")
          .map((profile, idx) => (
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
