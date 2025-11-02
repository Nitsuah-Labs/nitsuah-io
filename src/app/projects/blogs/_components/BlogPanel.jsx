"use client";
import Image from "next/image";
import PropTypes from "prop-types";
import { useState } from "react";
import styles from "../_styles/Blog.module.css";

export default function BlogPanel({ blog, onUpvote }) {
  const {
    id,
    title,
    description,
    image_url,
    author,
    category,
    tags,
    date,
    readTime,
    upvotes,
    comments,
    views,
  } = blog;

  const [isUpvoted, setIsUpvoted] = useState(false);
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);

  const handleUpvote = (e) => {
    e.stopPropagation();
    const newUpvoteState = !isUpvoted;
    setIsUpvoted(newUpvoteState);
    setCurrentUpvotes((prev) => (newUpvoteState ? prev + 1 : prev - 1));
    if (onUpvote) {
      onUpvote(id, newUpvoteState);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className={styles.blog_container}>
      <div className={styles.blog_image_wrapper}>
        <Image
          className={styles.blog_image}
          src={image_url}
          alt={title}
          width={400}
          height={250}
          style={{ objectFit: "cover" }}
          unoptimized
        />
        <div className={styles.blog_category_badge}>{category}</div>
      </div>

      <div className={styles.blog_details}>
        <div className={styles.blog_text}>
          <div className={styles.blog_title}>{title}</div>
          <div className={styles.blog_meta}>
            <span className={styles.blog_author}>By {author}</span>
            <span className={styles.blog_date}>
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className={styles.blog_readtime}>{readTime}</span>
          </div>
          <div className={styles.blog_description}>{description}</div>
          <div className={styles.blog_tags}>
            {tags &&
              tags.slice(0, 3).map((tag, index) => (
                <span key={index} className={styles.blog_tag}>
                  #{tag}
                </span>
              ))}
          </div>
        </div>

        <div className={styles.blog_stats}>
          <div className={styles.blog_stat}>
            <i className="fa fa-eye" aria-hidden="true"></i>
            <span>{views}</span>
          </div>
          <div className={styles.blog_stat}>
            <i className="fa fa-comment" aria-hidden="true"></i>
            <span>{comments}</span>
          </div>
        </div>

        <div className={styles.blog_actions}>
          <button
            onClick={handleUpvote}
            className={`${styles.blog_action_btn} ${isUpvoted ? styles.upvoted : ""}`}
            aria-label="Upvote"
          >
            <i
              className={`fa ${isUpvoted ? "fa-heart" : "fa-heart-o"}`}
              aria-hidden="true"
            ></i>
            <span>{currentUpvotes}</span>
          </button>
          <button
            onClick={handleShare}
            className={styles.blog_action_btn}
            aria-label="Share"
          >
            <i className="fa fa-share-alt" aria-hidden="true"></i>
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}

BlogPanel.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    author: PropTypes.string,
    category: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    date: PropTypes.string,
    readTime: PropTypes.string,
    upvotes: PropTypes.number,
    comments: PropTypes.number,
    views: PropTypes.number,
  }).isRequired,
  onUpvote: PropTypes.func,
};
