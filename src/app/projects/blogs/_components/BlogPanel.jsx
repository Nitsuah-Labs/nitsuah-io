"use client";
import React from "react";
import PropTypes from 'prop-types';
import styles from "../_styles/Blog.module.css";
import Image from 'next/image';

export default function BlogPanel({ blog }) {
  const { id, name, description, image_url } = blog;

  return (
    <div className={styles.blog_container}>
      <div >
        <Image className={styles.blog_image} src={image_url} alt="" />
      </div>

      <div className={styles.blog_details}>
        <div className={styles.blog_text}>
          <div className={styles.blog_title}>{name}</div>
          <div className={styles.blog_description}>{description}</div>
        </div>
        <div className={styles.blog_action}>
            {id}
        </div>
      </div>
    </div>
  );
}

BlogPanel.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    description: PropTypes.string,
    image_url: PropTypes.string,
  }).isRequired,
};