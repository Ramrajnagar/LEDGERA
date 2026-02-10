
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LEDGERA | Supply Chain Control",
  description: "A command system for orchestrating trade, trust, and execution.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased selection:bg-control-cyan selection:text-control-dark`}
      >
        <div className="fixed inset-0 z-[-1] control-grid opacity-20 pointer-events-none" />
        <div className="fixed inset-0 z-[9999] scan-line pointer-events-none" />
        {children}
      </body>
    </html>
  );
}
