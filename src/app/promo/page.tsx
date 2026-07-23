import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { whatsappLink, whatsappMessages } from "@/lib/site";

const title = "léia | Oferta especial com R$ 100 de desconto";
const description =
  "Aproveite seu desconto de R$ 100,00 na léia, a assistente de IA no WhatsApp para o seu condomínio. Fale com nossa equipe e garanta a oferta.";

export const metadata: Metadata = {
  title,
  description,
  // Página é destino de QRcode de impressos, não de busca orgânica:
  // não deve ser indexada para não competir com a home no Google.
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/promo",
  },
  openGraph: {
    title,
    description,
    url: "/promo",
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

const promoHref = whatsappLink(whatsappMessages.promo);

export default function Promo() {
  return <LandingPage contatoHref={promoHref} especialistaHref={promoHref} />;
}
