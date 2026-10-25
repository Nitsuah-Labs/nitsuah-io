// Shared deterministic fixture for the screenshot suite (tests/visual) and the
// nightly journeys (tests/journeys). The site is static content plus a
// wallet-gated Web3 layer, so "demo data" is just the site itself: what
// matters is that nothing outside localhost can change a pixel.
//
//   - every third-party request is blocked (RPC, WalletConnect, Spline, fonts);
//     third-party images are replaced with a flat placeholder
//   - the clock is frozen, Math.random is seeded (the header's orbiting dots)
//   - CSS animations/transitions, canvases and spinners are hidden
const {
  decodeFunctionData,
  encodeAbiParameters,
  encodeFunctionResult,
  parseAbi,
} = require("viem");

const MULTICALL3 = "0xca11bde05977b3631167028862be2a173976ca11";
const GET_ETH_BALANCE = "0x4d2301cc";
const BALANCE_WEI = 1250000000000000000n; // 1.25 ETH
const multicallAbi = parseAbi([
  "function aggregate3((address target, bool allowFailure, bytes callData)[] calls) payable returns ((bool success, bytes returnData)[] returnData)",
]);

/** wagmi batches balance reads through Multicall3.aggregate3: answer them. */
function answerMulticall(data) {
  const { args } = decodeFunctionData({ abi: multicallAbi, data });
  return encodeFunctionResult({
    abi: multicallAbi,
    functionName: "aggregate3",
    result: args[0].map((call) =>
      call.callData.startsWith(GET_ETH_BALANCE)
        ? {
            success: true,
            returnData: encodeAbiParameters(
              [{ type: "uint256" }],
              [BALANCE_WEI],
            ),
          }
        : { success: false, returnData: "0x" },
    ),
  });
}

const FIXED_NOW = "2026-10-01T12:00:00.000Z";

// 8x8 flat slate PNG, served for any third-party image.
const PLACEHOLDER_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAEUlEQVR4nGMwdgzFihiGlgQAmmUyQc0wg8gAAAAASUVORK5CYII=",
  "base64",
);

// Demo chain state: mainnet, 1.25 ETH.
const RPC_RESULTS = {
  eth_chainId: "0x1",
  eth_blockNumber: "0x1312d00",
  eth_getBalance: "0x11c37937e080000",
  eth_gasPrice: "0x3b9aca00",
  eth_getTransactionCount: "0x0",
  eth_call: "0x",
};

const FREEZE_CSS = `
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
    caret-color: transparent !important;
  }
  canvas { visibility: hidden !important; }
  .spinner, .spline-loading { visibility: hidden !important; }
  /* Header orbiting "binary star" dots (Brand.tsx): drawn from timers. */
  span[style*="top: -30px"][style*="pointer-events: none"] { display: none !important; }
`;

/** Install every determinism hook on a page. Call before the first goto. */
async function prepare(page) {
  await page.clock.setFixedTime(new Date(FIXED_NOW));

  await page.addInitScript(() => {
    // mulberry32: same sequence every load.
    let a = 0x9e3779b9;
    Math.random = () => {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    try {
      // Dark is the site default; only seed it so a reload keeps a choice
      // the journey made.
      if (!localStorage.getItem("nitsuah-theme"))
        localStorage.setItem("nitsuah-theme", "dark");
    } catch {
      /* storage unavailable */
    }
  });

  await page.route(
    (url) => !["localhost", "127.0.0.1"].includes(url.hostname),
    (route) => {
      const req = route.request();
      if (req.resourceType() === "image") {
        return route.fulfill({
          contentType: "image/png",
          body: PLACEHOLDER_PNG,
        });
      }
      // Chain RPC (viem http transport): answer with a fixed demo chain state
      // so the connected wallet shows a stable balance. Everything else dies.
      if (req.method() === "POST" && /"jsonrpc"/.test(req.postData() || "")) {
        const answer = (call) => ({
          jsonrpc: "2.0",
          id: call.id,
          result:
            call.method === "eth_call" &&
            call.params?.[0]?.to?.toLowerCase() === MULTICALL3
              ? answerMulticall(call.params[0].data ?? call.params[0].input)
              : (RPC_RESULTS[call.method] ?? null),
        });
        const body = JSON.parse(req.postData());
        return route.fulfill({
          contentType: "application/json",
          body: JSON.stringify(
            Array.isArray(body) ? body.map(answer) : answer(body),
          ),
        });
      }
      return route.abort();
    },
  );
}

/**
 * Replace every animated GIF with its first frame, so project cards don't
 * depend on when the screenshot lands. Uses Chromium's ImageDecoder.
 */
async function freezeGifs(page) {
  await page.evaluate(async () => {
    // Lazy images below the fold would start animating after the shot.
    for (const img of document.images) img.loading = "eager";
    await Promise.all(
      [...document.images].map((img) =>
        img.complete
          ? null
          : new Promise((r) => {
              img.addEventListener("load", r, { once: true });
              img.addEventListener("error", r, { once: true });
              setTimeout(r, 15000);
            }),
      ),
    );
    const gifs = [...document.images].filter((img) =>
      /\.gif(\?|$)/i.test(img.currentSrc || img.src),
    );
    await Promise.all(
      gifs.map(async (img) => {
        const res = await fetch(img.currentSrc || img.src);
        const data = await res.arrayBuffer();
        const decoder = new ImageDecoder({ data, type: "image/gif" });
        const { image } = await decoder.decode({ frameIndex: 0 });
        const canvas = document.createElement("canvas");
        canvas.width = image.displayWidth;
        canvas.height = image.displayHeight;
        canvas.getContext("2d").drawImage(image, 0, 0);
        image.close();
        img.removeAttribute("srcset");
        img.src = canvas.toDataURL("image/png");
        await img.decode().catch(() => {});
      }),
    );
  });
}

/**
 * Full-page captures only (the journeys keep the real layout): make the
 * page's chrome and scroll containers flow in the document, so every shot
 * runs top to bottom with the footer once at the true bottom.
 *   - the footer bar is position: fixed (it would be painted mid-page over
 *     content); make it relative so its absolutely placed children still anchor
 *   - the home and Labs pages scroll or clip inside `.App`/`main` (100vh
 *     wrappers with overflow hidden/auto, the home page is a two-row grid),
 *     which fullPage cannot extend; any clipped box is expanded
 *   - the "|" between the footer's LinkedIn and GitHub icons is a bare text
 *     divider that reads as a stray caret in a still
 */
async function expandForCapture(page) {
  await page.addStyleTag({
    content: `
      .footer-container { position: relative !important; }
      .footer-container .divider { display: none !important; }
      /* A build with NEXT_PUBLIC_TEST_HELPERS=1 makes test-helpers.css force
         footer display: block, which stacks the icons at the left. */
      footer.footer-container { display: flex !important; }
      /* The home page is a two-row 100vh grid whose rows clip their cards. */
      .home-main > section { height: auto !important; min-height: 0 !important; overflow-x: clip !important; overflow-y: visible !important; }
    `,
  });
  await page.evaluate(() => {
    const expand = (el) => {
      el.style.setProperty("height", "auto", "important");
      el.style.setProperty("max-height", "none", "important");
      // Free the vertical axis only: the real layout hides sideways overflow.
      el.style.setProperty("overflow-x", "clip", "important");
      el.style.setProperty("overflow-y", "visible", "important");
      if (getComputedStyle(el).display === "grid")
        el.style.setProperty("grid-template-rows", "none", "important");
    };
    // A clipped box and every ancestor up to <html> flow with their content
    // (an ancestor with a fixed 100vh height would clip it again). Repeat:
    // freeing a box can reveal another clipped one inside it.
    for (let pass = 0; pass < 4; pass++) {
      for (const el of document.querySelectorAll("body *")) {
        const s = getComputedStyle(el);
        const clipped =
          /(hidden|auto|scroll)/.test(s.overflowY) &&
          el.scrollHeight > el.clientHeight + 8 &&
          el.clientHeight > 60;
        if (!clipped) continue;
        for (let p = el; p; p = p.parentElement) expand(p);
      }
    }
  });
  await page.evaluate(
    () =>
      new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  );
}

/** Wait until fonts are ready and the page has stopped changing. */
async function settle(page) {
  await page.waitForLoadState("load");
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: FREEZE_CSS });
  // Client components fill in dates/lists after hydration.
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.evaluate(
    () =>
      new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  );
  // The header brand swaps NITSUAH -> AUSTIN H. on a 3 s timer (Homebar.tsx);
  // wait for the swap so no shot lands on either side of it. Labs pages use
  // a different header and have no brand link. The aria-label prefix is
  // uppercase ("AUSTIN H. home" / "NITSUAH home"), so match the shared suffix.
  const brand = page.locator('a[aria-label$="home - Navigate to homepage"]');
  if ((await brand.count()) > 0) {
    await page.waitForFunction(
      () =>
        /AUSTIN H\./.test(
          document.querySelector(
            'a[aria-label$="home - Navigate to homepage"]',
          )?.textContent ?? "",
        ),
      null,
      { timeout: 10_000 },
    );
  }
  await freezeGifs(page);
  await page.mouse.move(0, 0);
}

/** Navigate and settle. */
async function open(page, path) {
  await page.goto(path, { waitUntil: "load" });
  await settle(page);
}

module.exports = { FIXED_NOW, prepare, settle, open, expandForCapture };
