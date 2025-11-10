"use client";
import React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class SplineErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Spline component error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "400px",
              color: "#ffffff",
              backgroundColor: "#0a0a0a",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <div>
              <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                Interactive 3D scene temporarily unavailable
              </p>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>
                The visualization will be back soon
              </p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
