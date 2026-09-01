import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Backdrop } from "@/components/background/Backdrop";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Preloader } from "@/components/layout/Preloader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { site } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Used sparingly — italic serif accents in headings. */
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Financial Technology Student & Python Developer`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.name} — Portfolio`,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Muhammad Rafay Khan",
    "Financial Technology",
    "FinTech student",
    "Python developer",
    "Karachi",
    "Pakistan",
    "Mohammad Ali Jinnah University",
    "financial machine learning",
    "data analysis",
    "machine learning",
    "digital banking",
    "portfolio",
  ],
  category: "technology",
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: `${site.name} — Portfolio`,
    title: `${site.name} — Financial Technology Student & Python Developer`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Financial Technology Student`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#050609",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/** schema.org Person — helps search engines understand who this is about. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  telephone: site.phone,
  url: site.url,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Mohammad Ali Jinnah University",
  },
  knowsAbout: [
    "Financial Technology",
    "Python",
    "Data Analysis",
    "Financial Accounting",
    "Machine Learning",
    "Digital Banking",
  ],
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink-950 font-sans">
        <script
          type="application/ld+json"
          // Static, author-controlled JSON — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />

        {/* No-JS safety net. Motion server-renders entrance states as inline
            opacity:0, and the preloader only dismisses via script — without
            this, a JS-disabled visitor would see a blank page. Scoped to
            <noscript>, so it never touches the scripted experience. */}
        <noscript>
          <style>{`[data-preloader]{display:none!important}[style*="opacity:0"]{opacity:1!important;filter:none!important;transform:none!important}`}</style>
        </noscript>

        <SmoothScroll>
          <a
            href="#main"
            className="sr-only-focusable top-4 left-4 z-100 rounded-full bg-iris-500 px-5 py-2.5 text-sm font-medium text-white"
          >
            Skip to content
          </a>

          <Backdrop />
          <ScrollProgress />
          <Navbar />

          <main id="main" className="relative">
            {children}
          </main>

          <Footer />
          <Preloader />
        </SmoothScroll>
      </body>
    </html>
  );
}
