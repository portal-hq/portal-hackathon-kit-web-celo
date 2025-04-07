import Head from "next/head";
import React from "react";
import { PortalIcon } from "./ui/Logo";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-portal-background-dark text-portal-foreground dark:text-portal-foreground-dark antialiased transition-colors duration-200">
      <Head>
        <title>Portal Wallet | Hackathon Kit</title>
        <meta
          name="description"
          content="Portal Wallet - Stablecoin Finance Infrastructure"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header className="border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <PortalIcon className="w-20" />
          </div>
          <nav className="flex items-center space-x-4">
            <a
              href="https://docs.portalhq.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-portal-primary dark:hover:text-portal-primary transition"
            >
              Docs
            </a>
            <a
              href="https://github.com/portal-hq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-portal-primary dark:hover:text-portal-primary transition"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>

      <footer className="border-t border-gray-100 dark:border-gray-800 mt-12">
        <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              © {new Date().getFullYear()} Portal Labs, Inc.
            </div>
            <div className="flex space-x-6">
              <a
                href="https://x.com/portal_hq"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-portal-primary transition"
              >
                X
              </a>
              <a
                href="https://www.linkedin.com/company/portalhq"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-portal-primary transition"
              >
                LinkedIn
              </a>
              <a
                href="https://www.portalhq.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-portal-primary transition"
              >
                Website
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
