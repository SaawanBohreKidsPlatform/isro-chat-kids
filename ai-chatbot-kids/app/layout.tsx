import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "ISRO Space Agent",
  description: "An AI Chatbot sharing ISRO's knowledge for kids",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Suspense>
        <Toaster position="top-right" closeButton />
        <body className={roboto.className}>{children}</body>
      </Suspense>
    </html>
  );
}
