import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen w-screen pt-16`}
        style={{
          background:
            "radial-gradient(circle, rgba(96,255,208,1) 0%, rgba(0,211,148,1) 100%)",
        }}
      >
        <main className="mx-auto max-w-4xl">{children}</main>
      </body>
    </html>
  );
}
