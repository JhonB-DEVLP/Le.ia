import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteUrl, organization } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "léia | Assistente de IA para o seu condomínio";
const description =
  "Até 95% das dúvidas dos moradores do condomínio solucionadas por léia, sua nova assistente de IA no WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "léia",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: organization.name,
  legalName: organization.legalName,
  url: organization.url,
  logo: organization.logo,
  description: organization.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: organization.address.street,
    addressLocality: organization.address.locality,
    addressRegion: organization.address.region,
    addressCountry: organization.address.country,
  },
  ...(organization.sameAs.length > 0 ? { sameAs: organization.sameAs } : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body
        className="flex min-h-full flex-col overflow-x-clip"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
