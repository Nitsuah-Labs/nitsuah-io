"use client";
import React from "react";
import styles from "./Search.module.css";

export default function Search(): React.ReactElement {
  return (
    <div className={styles.container}>
      <input
        aria-label="Search"
        placeholder="Search"
        className={styles.input}
      />
    </div>
  );
}
