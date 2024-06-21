import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";
import { appURL } from "./utils";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Lens Profile Stats Frame",
    other: {
      ...(await fetchMetadata(new URL("/frames", appURL()))),
    },
  };
}

export default async function Home() {
  return <div>Lens Profile Stats Frame</div>;
}
