# Render image for the nitsuah-io promo spots: Chromium (Playwright image, same
# version as @playwright/test in package.json), ffmpeg, numpy and scipy for the
# music. The repo's own dependencies are not needed: spots are compose-only.
FROM mcr.microsoft.com/playwright:v1.64.0-jammy
RUN apt-get update && apt-get install -y --no-install-recommends python3 python3-pip ffmpeg \
 && rm -rf /var/lib/apt/lists/* && pip3 install --no-cache-dir numpy scipy
WORKDIR /opt/render
RUN npm init -y >/dev/null && npm install playwright@1.64.0
ENV NODE_PATH=/opt/render/node_modules
