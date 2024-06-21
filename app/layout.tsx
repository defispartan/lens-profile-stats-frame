import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lens Profile Stats Frame",
  description: "Frame to view stas for connected Lens Profile",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
