'use client';

import Link from 'next/link';
import Footer from './_components/_site/Footer';
import HomeBar from './_components/_site/Homebar';

export default function NotFound() {
  return (
    <div className="App">
      <div className="header">
        <HomeBar />
      </div>

      <div className="not-found-container">
        <div className="not-found-content">
          <div className="error-code">404</div>
          <h1 className="error-title">Page Not Found</h1>
          <p className="error-description">
            The page you're looking for doesn't exist or has been moved.
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
          color: #3b82f6;
          line-height: 1;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
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

        .error-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .primary-button {
          background: #3b82f6;
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
          background: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .secondary-button {
          background: transparent;
          color: #3b82f6;
          padding: 1rem 2rem;
          border: 2px solid #3b82f6;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .secondary-button:hover {
          background: #3b82f6;
          color: white;
          transform: translateY(-2px);
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

        .helpful-links a {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .helpful-links a:hover {
          color: #2563eb;
          text-decoration: underline;
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
