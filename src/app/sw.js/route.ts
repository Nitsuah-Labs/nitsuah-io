import { NextResponse } from "next/server";

// Prerendered at build time so it also works in a static export.
export const dynamic = "force-static";

// Return an empty service worker to unregister any cached service workers
export async function GET() {
  return new NextResponse(
    `
// Empty service worker to unregister any previously registered workers
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  self.clients.claim();
});
    `.trim(),
    {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    },
  );
}
