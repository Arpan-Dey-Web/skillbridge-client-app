import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import QueryProvider from "@/components/provider/query-provider";
import { ThemeProvider } from "@/components/provider/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://skillbridge-client-app.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LearnHub | Book Expert Tutors Online",
    template: "%s | LearnHub",
  },

  description:
    "LearnHub is a modern tutoring marketplace where students can book verified expert tutors across multiple subjects. Schedule sessions, manage bookings, and learn smarter.",

  keywords: [
    "online tutoring",
    "book tutors",
    "student tutor marketplace",
    "private tutors",
    "LearnHub",
  ],

  applicationName: "LearnHub",
  authors: [{ name: "LearnHub Team" }],
  creator: "LearnHub",
  publisher: "LearnHub",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    title: "LearnHub | Book Expert Tutors Online",
    description:
      "Find and book expert tutors easily. Flexible scheduling, verified profiles, and seamless online sessions.",
    siteName: "LearnHub",
    images: [
      {
        url: "leader.png",
        width: 1200,
        height: 630,
        alt: "LearnHub - Online Tutoring Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "LearnHub | Book Expert Tutors Online",
    description:
      "Find and book expert tutors easily. Flexible scheduling and seamless online sessions.",
    images: ["/leader.png"],
  },

  icons: {
    icon: "/leader.png",
    shortcut: "/leader.png",
    apple: "/apple-touch-icon.png",
  },

  category: "education",
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
