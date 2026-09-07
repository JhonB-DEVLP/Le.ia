import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Public_Sans } from "next/font/google";
import { siteUrl, organization } from "@/lib/site";
import "./globals.css";

/*
  Duas famílias com papéis claramente distintos: Bricolage Grotesque, de
  largura variável e desenho um pouco irregular, carrega a personalidade nos
  títulos; Public Sans, humanista e de altura-x generosa, cuida do texto
  corrido em português.
*/
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
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

/*
  Aplica o tema antes da primeira pintura. Sem isso a página nasce clara e
  pisca ao trocar para escuro na hidratação. Roda síncrono no <head>, lê a
  escolha salva e cai na preferência do sistema quando não há nenhuma.
  `data-trocando` suprime a transição de cores nesse primeiro instante.
*/
const scriptTema = `(function(){try{
var t=localStorage.getItem('tema');
if(t!=='claro'&&t!=='escuro'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'escuro':'claro';}
var r=document.documentElement;
r.dataset.tema=t;r.setAttribute('data-trocando','');
requestAnimationFrame(function(){requestAnimationFrame(function(){r.removeAttribute('data-trocando');});});
}catch(e){document.documentElement.dataset.tema='claro';}})();`;

/*
  Pinta a barra do navegador (e a status bar no mobile) com a cor de fundo
  do tema ativo. Sem isso ela fica branca mesmo com a página no escuro.
  Os valores acompanham `--leia-fundo` de cada tema em globals.css.
*/
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#070f2b" },
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: organization.name,
  legalName: organization.legalName,
  taxID: organization.taxID,
  url: organization.url,
  logo: organization.logo,
  email: organization.email,
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
      suppressHydrationWarning
      className={`${bricolage.variable} ${publicSans.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
      </head>
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
