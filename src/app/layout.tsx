import { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  // Sets the root for resolving relative URLs (important for OpenGraph & canonical URLs)
  metadataBase: new URL("https://bittengo.org"),

  // Title structure (default + template for dynamic pages)
  title: {
    default: "Bittengo | Noleggio Veicoli",
    template: "%s | Bittengo",
  },

  // Primary SEO description
  description:
    "Scopri le migliori offerte di noleggio veicoli con Bittengo. Tariffe competitive, ampia scelta e servizi rapidi per aziende e privati.",

  // Helps search engines understand niche relevance
  keywords: ["noleggio veicoli", "noleggio auto", "auto a noleggio", "furgoni a noleggio", "Bittengo", "noleggio economico"],

  // Favicon & Icons — currently using same favicon for all, but scalable for future PWA or Apple icons
  icons: {
    icon: ["/favicon.ico"], // Standard browser favicon
    shortcut: "/favicon.ico", // Used by some Chromium & Safari
    apple: "/favicon.ico", // Used when saved to iOS home screen
  },

  // OpenGraph improves appearance when sharing on Facebook / LinkedIn / WhatsApp
  openGraph: {
    type: "website",
    url: "https://bittengo.org",
    siteName: "Bittengo",
    title: "Bittengo | Noleggio Veicoli",
    description: "Scopri le migliori offerte di noleggio veicoli con Bittengo. Tariffe competitive e una vasta gamma di veicoli per ogni esigenza.",
    images: [
      {
        url: "/favicon.ico", // <-- Can be improved (see notes below)
        width: 512,
        height: 512,
        alt: "Bittengo Logo",
      },
    ],
  },

  // Twitter Card for better appearance on Twitter/X
  twitter: {
    card: "summary", // Using summary because favicon is square. Use "summary_large_image" only if you provide 1200x630 image.
    title: "Bittengo | Noleggio Veicoli",
    description: "Tariffe vantaggiose e ampia selezione di veicoli a noleggio. Scopri Bittengo!",
    images: ["/favicon.ico"],
  },

  // Tells search engines the correct URL to index
  alternates: {
    canonical: "https://bittengo.org",
  },

  // SEO crawling rules
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning={true}>
      <head>
        <meta name="msvalidate.01" content="7DDDEFB6D58B6DE049D9EF74321F5A8A" />
      </head>
      <body className={`antialiased font-roboto`}>
        <ReduxProvider>
          {children}
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
