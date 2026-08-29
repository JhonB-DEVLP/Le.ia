import { empresa, siteUrl } from "@/lib/site";

/**
 * Registro público de um número de WhatsApp operado pela plataforma.
 *
 * POR QUE ESTA PÁGINA EXISTE: a Meta exige que o nome de exibição
 * ("display name") de um número de WhatsApp Business tenha lastro em um ativo
 * público verificável — na prática, o nome precisa aparecer, escrito
 * exatamente igual, em um site sob domínio conhecido. Um nome sem essa
 * correlação é recusado ou fica preso em análise.
 *
 * Cada número atendido pela léia nasce dentro da conta da operadora
 * (`empresa.razaoSocial`), mas usa um nome de exibição próprio. Esta rota dá
 * a cada um deles a página pública que a análise da Meta procura.
 *
 * >>> Para publicar um novo atendimento, acrescente um item a `atendimentos`. <<<
 * O `slug` vira a URL (/c/{slug}), entra no sitemap e é gerado no build.
 */
export type Atendimento = {
  /** Segmento da URL. Minúsculas, sem acento, palavras separadas por hífen. */
  slug: string;
  /**
   * Nome de exibição EXATAMENTE como submetido à Meta.
   * Precisa bater caractere a caractere com o campo do WhatsApp Manager —
   * é essa comparação que a análise faz. Não "arrumar" maiúsculas nem acentos.
   */
  nomeExibicao: string;
  /** Número em formato internacional legível, como a Meta o exibe. */
  telefone: string;
  /** Quem é atendido por este número, em uma frase. */
  descricao: string;
};

export const atendimentos: readonly Atendimento[] = [
  {
    slug: "assistente-leia",
    nomeExibicao: "Assistente Leia",
    telefone: "+55 81 95168-8045",
    descricao:
      "Canal de atendimento da léia para demonstrações da plataforma e suporte a administradoras de condomínios.",
  },
] as const;

/** Busca um atendimento pelo slug da URL. `undefined` quando não existe. */
export function acharAtendimento(slug: string): Atendimento | undefined {
  return atendimentos.find((a) => a.slug === slug);
}

/** URL pública canônica de um atendimento. */
export function urlAtendimento(slug: string): string {
  return `${siteUrl}/c/${slug}`;
}

/**
 * Dados estruturados do atendimento (JSON-LD).
 *
 * Declara, de forma legível por máquina, que o nome de exibição pertence à
 * operadora — o mesmo vínculo que a página afirma em texto. Reforça a
 * correlação que a análise da Meta procura.
 */
export function jsonLdAtendimento(atendimento: Atendimento) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: atendimento.nomeExibicao,
    url: urlAtendimento(atendimento.slug),
    telephone: atendimento.telefone,
    description: atendimento.descricao,
    parentOrganization: {
      "@type": "Organization",
      name: empresa.razaoSocial,
      taxID: empresa.cnpj,
      url: siteUrl,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: empresa.endereco.logradouro,
      addressLocality: empresa.endereco.cidade,
      addressRegion: empresa.endereco.estado,
      addressCountry: "BR",
    },
  };
}
