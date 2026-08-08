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
 * E-mail de contato exibido em páginas públicas (ex.: política de privacidade).
 * É o mesmo endereço configurado em CONTACT_EMAIL_TO, que recebe o formulário.
 */
export const contatoEmail = "contato@assistenteleia.com.br";

/**
 * Dados da operadora do serviço, usados nas páginas legais e no rodapé.
 *
 * IMPORTANTE: `razaoSocial` é a entidade jurídica que opera a plataforma
 * (Herbie IA LTDA); `nome` é o nome fantasia do produto (léia). A verificação
 * de Tech Provider da Meta compara a razão social declarada no formulário com
 * a exibida no site — os dois precisam bater exatamente. Não substitua a razão
 * social pelo nome fantasia.
 */
export const empresa = {
  nome: "léia",
  razaoSocial: "Herbie IA LTDA",
  cnpj: "64.111.928/0001-26",
  endereco: {
    logradouro: "Rua do Apolo, 118, sala 03",
    bairro: "Recife Antigo",
    cidade: "Recife",
    estado: "PE",
    pais: "Brasil",
  },
} as const;

/**
 * URL do painel web usado pelas administradoras contratantes.
 * Aplicação separada deste site institucional.
 */
export const appUrl = "https://app.assistenteleia.com.br";

/**
 * Dados da organização usados no JSON-LD (dados estruturados de SEO).
 * PENDENTE DE CONFIRMAÇÃO: preencha `sameAs` com os perfis de redes sociais
 * (Instagram, LinkedIn, Facebook etc.). Deixe o array vazio se ainda não houver.
 */
export const organization = {
  name: "léia",
  // Razão social da operadora, não o nome fantasia (ver `empresa` acima).
  legalName: empresa.razaoSocial,
  taxID: empresa.cnpj,
  url: siteUrl,
  logo: `${siteUrl}/Logo.png`,
  email: contatoEmail,
  description:
    "Assistente de IA no WhatsApp que resolve até 95% das dúvidas dos moradores de condomínios.",
  address: {
    street: empresa.endereco.logradouro,
    locality: empresa.endereco.cidade,
    region: empresa.endereco.estado,
    country: "BR",
  },
  // Ex.: ["https://www.instagram.com/...", "https://www.linkedin.com/company/..."]
  sameAs: [] as string[],
};
