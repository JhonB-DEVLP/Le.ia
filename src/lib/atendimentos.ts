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
 * Cada número usa um nome de exibição próprio, e esta rota dá a cada um deles
 * a página pública que a análise da Meta procura.
 *
 * >>> Para publicar um novo atendimento, acrescente um item a `atendimentos`. <<<
 * O `slug` vira a URL (/c/{slug}), entra no sitemap e é gerado no build.
 */

/**
 * O dono do número perante a Meta, quando não é a operadora.
 *
 * Um número chega à léia de dois jeitos, e a página afirma coisas diferentes
 * em cada um:
 *
 * - **Sem `titular`**: o número foi cadastrado na conta de WhatsApp da
 *   operadora (`empresa.razaoSocial`). A página diz que é ela quem o opera.
 * - **Com `titular`**: o número entrou por coexistência e continua na conta
 *   empresarial do próprio cliente na Meta. A página diz que o número é dele
 *   e que a léia fornece a tecnologia. Dizer que a operadora opera um número
 *   que não é dela seria falso — e é esse vínculo que a análise confere.
 *
 * No cadastro da coexistência a Meta pede o site da empresa: o endereço a
 * informar é o desta página, com `www`.
 */
export type Titular = {
  /** Nome da empresa exatamente como o cliente o registra na Meta. */
  nome: string;
  /** Opcionais: ausentes, a página omite a linha. Preencher quando o cliente informar. */
  cnpj?: string;
  cidade?: string;
  estado?: string;
};

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
  /** Ausente quando o número é da operadora. Ver `Titular`. */
  titular?: Titular;
};

export const atendimentos: readonly Atendimento[] = [
  {
    slug: "assistente-leia",
    nomeExibicao: "Assistente Leia",
    telefone: "+55 81 95168-8045",
    descricao:
      "Canal de atendimento da léia para demonstrações da plataforma e suporte a administradoras de condomínios.",
  },
  {
    slug: "rfc-sindicatura-profissional",
    nomeExibicao: "RFC- Sindicatura Profissional",
    telefone: "+55 34 9222-5991",
    descricao:
      "Canal de atendimento, pelo WhatsApp, aos moradores dos condomínios atendidos pela RFC- Sindicatura Profissional.",
    titular: {
      nome: "RFC- Sindicatura Profissional",
    },
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
 * Declara, de forma legível por máquina, o mesmo vínculo que a página afirma
 * em texto — reforça a correlação que a análise da Meta procura. Com
 * `titular`, a organização é o cliente e a operadora não entra como
 * `parentOrganization`: ela fornece a tecnologia, não é dona do número.
 */
export function jsonLdAtendimento(atendimento: Atendimento) {
  const { titular } = atendimento;

  if (titular) {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: titular.nome,
      ...(titular.nome !== atendimento.nomeExibicao
        ? { alternateName: atendimento.nomeExibicao }
        : {}),
      url: urlAtendimento(atendimento.slug),
      telephone: atendimento.telefone,
      description: atendimento.descricao,
      ...(titular.cnpj ? { taxID: titular.cnpj } : {}),
      ...(titular.cidade
        ? {
            address: {
              "@type": "PostalAddress",
              addressLocality: titular.cidade,
              addressRegion: titular.estado,
              addressCountry: "BR",
            },
          }
        : {}),
    };
  }

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
