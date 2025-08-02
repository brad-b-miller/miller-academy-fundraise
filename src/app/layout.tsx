import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Miller Academy Fundraiser - Supporting Our Daughters' Education",
  description: "Support Chloe, Phoebe, and Lydia's educational journey through their handcrafted creations. Every purchase helps fund amazing learning activities, curriculum, and school materials for Miller Academy.",
  icons: {
    icon: '/sunflower.svg',
    shortcut: '/sunflower.svg',
    apple: '/sunflower.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&family=Playfair+Display:wght@400;500;600;700&family=Delius&family=Fredericka+the+Great&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
