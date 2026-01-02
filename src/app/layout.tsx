import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as base font
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elite Essences",
  description: "Premium Perfume Collection",
};

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import { auth } from "@/auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className="dark">
      <body className={inter.className + " min-h-screen flex flex-col"}>
        <Navbar session={session} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
