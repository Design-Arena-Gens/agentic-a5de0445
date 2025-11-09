import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Facebook Marketplace AI Agent",
  description: "AI-powered agent for Facebook Marketplace sales optimization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
