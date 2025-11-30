/**
 * Warmup script for Next.js dev server
 * Triggers compilation of the homepage before tests run
 * This prevents tests from hitting the server during initial compilation
 */

const baseURL = process.env.BASE_URL || "http://localhost:3000";
const maxAttempts = 60; // 60 seconds max
const retryDelay = 1000; // 1 second between attempts

console.log(`🔥 Warming up dev server at ${baseURL}...`);

async function warmup() {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(baseURL);
      const html = await response.text();
      
      // Check if we got actual content (not just the incomplete shell)
      if (html.length > 10000 && html.includes("<body")) {
        console.log(`✅ Dev server warmed up after ${attempt} attempts (${html.length} bytes)`);
        process.exit(0);
      } else {
        console.log(`⏳ Attempt ${attempt}/${maxAttempts}: Got ${html.length} bytes, waiting for compilation...`);
      }
    } catch (error) {
      if (attempt === 1) {
        console.log(`⏳ Attempt ${attempt}/${maxAttempts}: Server not ready, waiting...`);
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, retryDelay));
  }
  
  console.error(`❌ Warmup failed after ${maxAttempts} attempts`);
  process.exit(1);
}

warmup();
