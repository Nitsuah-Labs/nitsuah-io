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
  // a different header and have no brand link.
  const brand = page.locator('a[aria-label^="Austin H home"]');
  if ((await brand.count()) > 0) {
    await page.waitForFunction(
      () =>
        /AUSTIN H./.test(
          document.querySelector('a[aria-label^="Austin H home"]')
            ?.textContent ?? "",
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

module.exports = { FIXED_NOW, prepare, settle, open };
