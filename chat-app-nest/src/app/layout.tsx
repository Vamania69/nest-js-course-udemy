"use client";
import client from "@/constants/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="referrer" content="strict-origin-when-cross-origin"></meta>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-4`}
      >
        {/* This is to  manage all the req. to the graphql data and manage the cache */}
        <ApolloProvider client={client}>
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          > */}
          <Toaster />
          {/* <Guard>{children}</Guard> */}
          {children}
          {/* </ThemeProvider> */}
        </ApolloProvider>
      </body>
    </html>
  );
}
