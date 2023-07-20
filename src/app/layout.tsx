import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Provider from "./Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Pintastic",
    template: "%s | Pintastic",
  },
};

export default function RootLayout({
  children,
  layout,
}: {
  children: React.ReactNode;
  layout: boolean;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
