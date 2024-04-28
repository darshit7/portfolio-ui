import '@/css/tailwind.css';
import '@/css/twemoji.css';
import '@/css/resume.css';
import '@/css/about.css';
import '@/css/prism.css';
import 'katex/dist/katex.css';
import type { Metadata } from "next";
import Script from 'next/script';
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from 'next-themes';
import siteMetadata from '@/data/siteMetadata';
import LayoutWrapper from '@/components/LayoutWrapper';
import { UmamiScript } from '@/components/Unami';

const inter = Inter({ subsets: ["latin"] })

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang={siteMetadata.language} className="scroll-smooth">
      <head>
          <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/tennis-racquet.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/tennis-racquet.png" />
          <link rel="manifest" href="/static/favicons/site.webmanifest" />
          <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
          <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
      </head>
      <UmamiScript />
      <body 
        className={cn(
          "relative bg-white text-black antialiased dark:bg-dark dark:text-white",
          inter.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
