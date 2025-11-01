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
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .not-found-content {
          max-width: 600px;
          text-align: center;
          background: white;
          padding: 3rem;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .error-code {
          font-size: 8rem;
          font-weight: 900;
          color: #f97316;
          line-height: 1;
          margin-bottom: 0.5rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
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
          color: #1a1a1a;
          margin-bottom: 1rem;
        }

        .error-description {
          font-size: 1.2rem;
          color: #6b7280;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .error-joke {
          display: block;
          font-size: 1rem;
          color: #9ca3af;
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
          background: #f8fafc;
          padding: 2rem;
          border-radius: 12px;
          margin-top: 2rem;
        }

        .helpful-links h3 {
          color: #374151;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .helpful-links ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .helpful-links li {
          margin-bottom: 0.75rem;
        }

        @media (max-width: 768px) {
          .not-found-content {
            padding: 2rem;
          }

          .error-code {
            font-size: 6rem;
          }

          .error-title {
            font-size: 2rem;
          }

          .error-actions {
            flex-direction: column;
            align-items: center;
          }

          .primary-button,
          .secondary-button {
            width: 100%;
            justify-content: center;
          }
        }

        @media (prefers-color-scheme: dark) {
          .not-found-container {
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          }

          .not-found-content {
            background: #1f2937;
            color: #f9fafb;
          }

          .error-title {
            color: #f9fafb;
          }

          .error-description {
            color: #d1d5db;
          }

          .helpful-links {
            background: #374151;
          }

          .helpful-links h3 {
            color: #e5e7eb;
          }
        }
      `}</style>
    </div>
  );
}
