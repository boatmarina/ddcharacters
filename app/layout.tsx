import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "D&D Character Forge",
  description:
    "Transform any fictional character into a D&D 5e character sheet using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
