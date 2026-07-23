import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /promo é destino de QRcode de impressos: já é noindex e não entra
      // no sitemap. Bloquear aqui é defesa em profundidade — evita gastar
      // budget de rastreamento com ela e reforça o sinal de "não indexar".
      disallow: "/promo",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
