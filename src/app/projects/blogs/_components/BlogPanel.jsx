import React from "react";
import styles from "../styles/Blog.module.css";
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