import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-sans-3',
});

export const metadata: Metadata = {
  title: "Food Wagen App",
  description: "A food delivery app built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${sourceSans3.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
