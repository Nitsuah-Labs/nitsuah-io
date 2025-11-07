"use client";

import Link from "next/link";
import Footer from "./_components/_site/Footer";
import HomeBar from "./_components/_site/Homebar";

export default function NotFound() {
  return (
    <div className="App">
      <div className="header">
        <HomeBar />
      </div>

      <div className="not-found-container">
        <div className="not-found-content">
          <div className="error-code">404</div>
          <div className="error-emoji">🤔</div>
          <h1 className="error-title">Well, this is awkward...</h1>
          <p className="error-description">
            Looks like you found a page that doesn&apos;t exist. Even the best
            engineers hit 404s sometimes.
            <br />
            <span className="error-joke">
              (Maybe it&apos;s still compiling? 😅)
            </span>
          </p>

          <div className="error-actions">
            <Link href="/" className="primary-button">
              Go Home
            </Link>
            <Link href="/projects" className="secondary-button">
              View Projects
            </Link>
          </div>

          <div className="helpful-links">
            <h3>You might be looking for:</h3>
            <ul>
              <li>
                <Link href="/about">About Austin</Link>
              </li>
              <li>
                <Link href="/projects">Selected Projects</Link>
              </li>
              <li>
                <Link href="/labs">Web3 Labs</Link>
              </li>
              <li>
                <Link href="/projects/blogs">Blog Posts</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .not-found-container {
          min-height: calc(100vh - 200px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          margin-top: 80px;
          margin-bottom: 80px;
        }

        .not-found-content {
          max-width: 700px;
          text-align: center;
          background: rgba(249, 115, 22, 0.05);
          border: 2px solid rgba(249, 115, 22, 0.3);
          padding: 4rem 3rem;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(249, 115, 22, 0.15);
        }

        .error-code {
          font-size: 8rem;
          font-weight: 900;
          background: -webkit-linear-gradient(left, #f97316, #ea580c);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
          margin-bottom: 0.5rem;
          animation: pulse 2s ease-in-out infinite;
        }

        .error-emoji {
          font-size: 4rem;
          margin-bottom: 1rem;
          animation: bounce 1s ease-in-out infinite;
        }

        .error-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .error-description {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .error-joke {
          display: block;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 0.5rem;
          font-style: italic;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(0.95);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .error-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .primary-button {
          background: #f97316;
          color: white;
          padding: 1rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .primary-button:hover {
          background: #ea580c;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
        }

        .secondary-button {
          background: transparent;
          color: #f97316;
          padding: 1rem 2rem;
          border: 2px solid #f97316;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .secondary-button:hover {
          background: #f97316;
          color: white;
          transform: translateY(-2px);
        }

        .helpful-links a {
          color: #f97316;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .helpful-links a:hover {
          color: #ea580c;
          text-decoration: underline;
        }

        .helpful-links {
          text-align: left;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(249, 115, 22, 0.2);
          padding: 1.25rem;
          border-radius: 12px;
          margin-top: 0;
        }

        .helpful-links h3 {
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0.65rem;
          font-size: 1rem;
        }

        .helpful-links ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .helpful-links li {
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .helpful-links li:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .not-found-content {
            padding: 1.5rem 1rem;
          }

          .error-code {
            font-size: 4rem;
          }

          .error-title {
            font-size: 1.5rem;
          }

          .error-description {
            font-size: 0.9rem;
          }

          .error-actions {
            flex-direction: column;
            align-items: stretch;
            gap: 0.5rem;
          }

          .primary-button,
          .secondary-button {
            width: 100%;
            justify-content: center;
            padding: 0.6rem 1rem;
            font-size: 0.85rem;
          }

          .helpful-links {
            padding: 1rem;
          }

          .helpful-links h3 {
            font-size: 0.9rem;
          }

          .helpful-links li {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}
