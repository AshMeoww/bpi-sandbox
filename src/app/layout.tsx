import type { Metadata } from "next";
import { Geist, Geist_Mono, Public_Sans, Baloo_2 } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

const baloo2 = Baloo_2({
  variable: "--font-baloo-2",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KidsBank - My First Bank Account",
  description: "A fun and safe virtual banking app for kids",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${publicSans.variable} ${baloo2.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
