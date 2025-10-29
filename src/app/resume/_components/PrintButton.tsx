"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="labs-btn labs-btn-primary"
      aria-label="Print resume or save as PDF"
    >
      <i className="fa fa-file-pdf-o" aria-hidden="true"></i> Export PDF
    </button>
  );
}
