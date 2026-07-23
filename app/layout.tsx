import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "DDS Learning",
  description: "Learning DDS by building",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
