"use client";

import Link from "next/link";
import Footer from "./_components/_site/Footer";
import HomeBar from "./_components/_site/Homebar";
import { Providers } from "./providers";

export default function NotFound() {
  return (
    <Providers>
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
              Looks like you found a page that doesn&apos;t exist.
              <br />
              Even the best engineers hit 404s sometimes.
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
              <div className="link-cards">
                <Link href="/about" className="link-card">
                  <span className="card-emoji">👋</span>
                  <span className="card-text">About Austin</span>
                </Link>
                <Link href="/projects" className="link-card">
                  <span className="card-emoji">💼</span>
                  <span className="card-text">Selected Projects</span>
                </Link>
                <Link href="/labs" className="link-card">
                  <span className="card-emoji">🧪</span>
                  <span className="card-text">Web3 Labs</span>
                </Link>
                <Link href="/resume" className="link-card">
                  <span className="card-emoji">📄</span>
                  <span className="card-text">Resume</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Footer />

        <style jsx>{`
          .not-found-container {
            min-height: calc(100vh - 150px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            margin-top: 60px;
            margin-bottom: 40px;
          }

          .not-found-content {
            max-width: 600px;
            text-align: center;
            background: color-mix(
              in srgb,
              var(--color-surface-elevated) 92%,
              #f97316 8%
            );
            border: 2px solid
              color-mix(in srgb, var(--color-accent) 35%, transparent);
            padding: 2rem 1.5rem;
            border-radius: 16px;
            box-shadow: 0 10px 40px
              color-mix(in srgb, var(--color-accent) 18%, transparent);
          }

          .error-code {
            font-size: 5rem;
            font-weight: 900;
            background: -webkit-linear-gradient(left, #f97316, #ea580c);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1;
            margin-bottom: 0.25rem;
            animation: pulse 2s ease-in-out infinite;
          }

          .error-emoji {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            animation: bounce 1s ease-in-out infinite;
          }

          .error-title {
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--color-text-primary);
            margin-bottom: 0.5rem;
          }

          .error-description {
            font-size: 1rem;
            color: var(--color-text-secondary);
            margin-bottom: 1.5rem;
            line-height: 1.5;
          }

          .error-joke {
            display: block;
            font-size: 0.875rem;
            color: var(--color-text-tertiary);
            margin-top: 0.25rem;
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
            gap: 0.75rem;
            justify-content: center;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
          }

          .primary-button {
            background: var(--color-accent);
            color: #ffffff;
            padding: 0.65rem 1.25rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
          }

          .primary-button:hover {
            background: var(--color-accent-hover);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px
              color-mix(in srgb, var(--color-accent) 35%, transparent);
          }

          .secondary-button {
            background: transparent;
            color: var(--color-accent);
            padding: 0.65rem 1.25rem;
            border: 2px solid var(--color-accent);
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
          }

          .secondary-button:hover {
            background: var(--color-accent);
            color: white;
            transform: translateY(-2px);
          }

          .helpful-links {
            text-align: center;
            background: color-mix(
              in srgb,
              var(--color-surface) 88%,
              var(--color-background) 12%
            );
            border: 1px solid
              color-mix(in srgb, var(--color-accent) 26%, var(--color-border));
            padding: 1.25rem;
            border-radius: 12px;
            margin-top: 0;
          }

          .helpful-links h3 {
            color: var(--color-text-primary);
            margin-bottom: 0.75rem;
            font-size: 1rem;
          }

          .link-cards {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
          }

          .link-card {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.75rem 1rem;
            background: var(--color-accent);
            border: 2px solid var(--color-accent);
            border-radius: 8px;
            text-decoration: none;
            color: #ffffff;
            font-weight: 600;
            font-size: 0.875rem;
            transition: all 0.2s ease;
            cursor: pointer;
          }

          .link-card:hover {
            background: var(--color-accent-hover);
            border-color: var(--color-accent-hover);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px
              color-mix(in srgb, var(--color-accent) 35%, transparent);
          }

          .card-emoji {
            font-size: 1.25rem;
          }

          .card-text {
            text-align: center;
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

            .link-cards {
              grid-template-columns: 1fr;
            }

            .link-card {
              font-size: 0.8rem;
              padding: 0.6rem;
            }

            .card-emoji {
              font-size: 1.1rem;
            }
          }
        `}</style>
      </div>
    </Providers>
  );
}
