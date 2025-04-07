import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";

// Use Inter as a fallback font for Geist Sans
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable}`}>
      <Toaster
        position="top-right"
        richColors
        expand={false}
        closeButton
        toastOptions={{
          className: "toaster-item",
          style: {
            fontFamily: "var(--font-geist-sans, var(--font-inter), sans-serif)",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
          },
          duration: 3000,
        }}
      />
      <Component {...pageProps} />
    </div>
  );
}
