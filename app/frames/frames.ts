/* eslint-disable react/jsx-key */
import { farcasterHubContext, openframes } from "frames.js/middleware";
import { imagesWorkerMiddleware } from "frames.js/middleware/images-worker";
import { createFrames } from "frames.js/next";
import { DEFAULT_DEBUGGER_HUB_URL } from "../debug";
import { getLensFrameMessage, isLensFrameActionPayload } from "frames.js/lens";
import * as fs from "node:fs/promises";
import * as path from "node:path";

export const frames = createFrames({
  basePath: "/frames",
  initialState: {
    pageIndex: 0,
  },
  middleware: [
    imagesWorkerMiddleware({
      imagesRoute: "/images",
    }),
    farcasterHubContext({
      hubHttpUrl: DEFAULT_DEBUGGER_HUB_URL,
    }),
    openframes({
      clientProtocol: {
        id: "lens",
        version: "1.0.0",
      },
      handler: {
        isValidPayload: (body: JSON) => isLensFrameActionPayload(body),
        getFrameMessage: async (body: JSON) => {
          if (!isLensFrameActionPayload(body)) {
            return undefined;
          }
          const result = await getLensFrameMessage(body);

          return { ...result };
        },
      },
    }),
  ],
  imageRenderingOptions: async () => {
    const newmonoFont = fs.readFile(
      path.join(path.resolve(process.cwd(), "public/fonts"), "newmono.ttf")
    );
    const firaScriptFont = fs.readFile(
      path.join(
        path.resolve(process.cwd(), "public"),
        "FiraCodeiScript-Regular.ttf"
      )
    );

    const [newmonoFontData, firaScriptFontData] = await Promise.all([
      newmonoFont,
      firaScriptFont,
    ]);
    return {
      imageOptions: {
        fonts: [
          {
            name: "NewMono",
            data: newmonoFontData,
            weight: 400,
          },
          {
            name: "Fira Code",
            data: firaScriptFontData,
            weight: 700,
          },
        ],
      },
    };
  },
});
