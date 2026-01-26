import type { Metadata } from "next";
import { Geist, Geist_Mono, Google_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "./nav";
import { Toaster } from "@/components/ui/sonner";
import Footer from "./footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const googleSans = Google_Sans({
  variable: "--font-rethink-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book Assignment",
  description: "Assignment of books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${googleSans.variable} antialiased`}
      >
        <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
          <header className="">
            <NavBar />
          </header>
          <main className="py-12 px-6">{children}</main>
          <footer className="">
            <Footer />
          </footer>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
