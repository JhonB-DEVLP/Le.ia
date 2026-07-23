export const siteUrl = "https://assistenteleia.com.br";

/**
 * Número de WhatsApp usado nos botões de contato/vendas.
 * Formato internacional, apenas dígitos (sem "+", espaços ou traços).
 * >>> Para trocar o número do WhatsApp do site inteiro, altere APENAS esta linha. <<<
 */
export const whatsappNumber = "351910419459";

/**
 * Mensagens iniciais pré-preenchidas no WhatsApp.
 * - `default`: usada na home e nas demais páginas públicas.
 * - `promo`: usada SOMENTE na rota /promo (campanha de QRcode com desconto).
 */
export const whatsappMessages = {
  contato:
    "Olá, tudo bem? Gostaria de agendar uma reunião para conhecer melhor a Léia.",
  especialista:
    "Olá, tudo bem? Gostaria de falar com um especialista sobre a Léia.",
  promo:
    "Olá, quero saber mais sobre a Léia e aproveitar meu desconto de R$ 100,00",
} as const;

/**
 * Monta o link https://wa.me/ com a mensagem inicial já codificada na URL.
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Dados da organização usados no JSON-LD (dados estruturados de SEO).
 * PENDENTE DE CONFIRMAÇÃO: preencha `sameAs` com os perfis de redes sociais
 * (Instagram, LinkedIn, Facebook etc.). Deixe o array vazio se ainda não houver.
 */
export const organization = {
  name: "léia",
  legalName: "léia",
  url: siteUrl,
  logo: `${siteUrl}/Logo.png`,
  description:
    "Assistente de IA no WhatsApp que resolve até 95% das dúvidas dos moradores de condomínios.",
  address: {
    street: "Rua do Apolo, 118, sala 03",
    locality: "Recife",
    region: "PE",
    country: "BR",
  },
  // Ex.: ["https://www.instagram.com/...", "https://www.linkedin.com/company/..."]
  sameAs: [] as string[],
};
