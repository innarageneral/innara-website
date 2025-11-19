import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mealistik",
  description: "A meal prepping app for individuals with chronic illnesses due to hormonal imbalance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png"/>
        <script src="https://getlaunchlist.com/js/widget.js" defer></script>
        <script async src="https://plausible.io/js/pa-A556PzG0MyFcjDUm6Sxm6.js"></script>
        <script>
          window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
          plausible.init()
        </script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-full overflow-x-hidden font-sans text-slate-800 bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
