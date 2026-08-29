import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  acharAtendimento,
  atendimentos,
  jsonLdAtendimento,
  urlAtendimento,
} from "@/lib/atendimentos";
import { appUrl, contatoEmail, empresa, siteUrl } from "@/lib/site";

/** Gera uma página por atendimento no build. */
export async function generateStaticParams() {
  return atendimentos.map((a) => ({ slug: a.slug }));
}

/** Slug fora da lista responde 404 em vez de renderizar sob demanda. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const atendimento = acharAtendimento(slug);

  if (!atendimento) {
    return {};
  }

  // O nome de exibição abre o título: é o texto que a análise da Meta procura.
  const title = `${atendimento.nomeExibicao} | WhatsApp oficial | léia`;
  const description = `${atendimento.nomeExibicao} é o nome de exibição do WhatsApp ${atendimento.telefone}, operado por ${empresa.razaoSocial} (CNPJ ${empresa.cnpj}) na plataforma léia.`;
  const url = `/c/${atendimento.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
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
}

export default async function AtendimentoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const atendimento = acharAtendimento(slug);

  if (!atendimento) {
    notFound();
  }

  return (
    <>
      <Header />
      {/* id="top": o logo do Header aponta para #top em todas as páginas. */}
      <main id="top" className="bg-white">
        <script
          type="application/ld+json"
          // JSON-LD é dado, não script executável; o conteúdo vem do módulo
          // `atendimentos`, nunca de entrada do usuário.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdAtendimento(atendimento)),
          }}
        />

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
          <p className="text-sm font-medium text-[#4D6EFF]">
            Canal oficial de WhatsApp
          </p>

          {/* O nome de exibição, escrito exatamente como submetido à Meta. */}
          <h1 className="mt-2 text-3xl font-semibold text-black sm:text-4xl">
            {atendimento.nomeExibicao}
          </h1>

          <p className="mt-3 text-black/70">{atendimento.descricao}</p>

          <div className="mt-10 flex flex-col gap-12 leading-relaxed text-black/80">
            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-black sm:text-2xl">
                Identificação do canal
              </h2>
              <p>
                O nome{" "}
                <strong className="font-medium text-black">
                  {atendimento.nomeExibicao}
                </strong>{" "}
                identifica o número de WhatsApp{" "}
                <strong className="font-medium text-black">
                  {atendimento.telefone}
                </strong>{" "}
                na plataforma léia. É o nome que aparece ao morador quando ele
                recebe ou envia uma mensagem por este número.
              </p>

              <dl className="mt-2 flex flex-col gap-4 rounded-2xl border border-black/10 p-6">
                <div>
                  <dt className="text-sm font-semibold text-black">
                    Nome de exibição
                  </dt>
                  <dd className="mt-1">{atendimento.nomeExibicao}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-black">
                    Número de WhatsApp
                  </dt>
                  <dd className="mt-1">{atendimento.telefone}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-black">
                    Página oficial deste canal
                  </dt>
                  <dd className="mt-1">
                    {urlAtendimento(atendimento.slug).replace("https://", "")}
                  </dd>
                </div>
              </dl>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-black sm:text-2xl">
                Quem opera este número
              </h2>
              <p>
                Este canal é operado por{" "}
                <strong className="font-medium text-black">
                  {empresa.razaoSocial}
                </strong>
                , empresa brasileira sediada em {empresa.endereco.cidade},{" "}
                {empresa.endereco.estado}, responsável pela plataforma léia.
              </p>

              <dl className="mt-2 flex flex-col gap-4 rounded-2xl border border-black/10 p-6">
                <div>
                  <dt className="text-sm font-semibold text-black">
                    Razão social
                  </dt>
                  <dd className="mt-1">{empresa.razaoSocial}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-black">CNPJ</dt>
                  <dd className="mt-1">{empresa.cnpj}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-black">Endereço</dt>
                  <dd className="mt-1">
                    <address className="not-italic">
                      {empresa.endereco.logradouro}
                      <br />
                      {empresa.endereco.bairro}, {empresa.endereco.cidade} —{" "}
                      {empresa.endereco.estado}
                      <br />
                      {empresa.endereco.pais}
                    </address>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-black">E-mail</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${contatoEmail}`}
                      className="font-medium text-[#4D6EFF] hover:underline"
                    >
                      {contatoEmail}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-black">Site</dt>
                  <dd className="mt-1">
                    <a
                      href={siteUrl}
                      className="font-medium text-[#4D6EFF] hover:underline"
                    >
                      {siteUrl.replace("https://", "")}
                    </a>
                  </dd>
                </div>
              </dl>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-black sm:text-2xl">
                Como o atendimento funciona
              </h2>
              <p>
                O atendimento é feito por inteligência artificial, que se
                identifica como tal, e responde com base nos documentos
                cadastrados pela administradora — regimento interno, convenção,
                horários de áreas comuns e comunicados. Quando a situação exige
                uma pessoa, a conversa é encaminhada à equipe responsável, que
                assume o atendimento pelo painel em{" "}
                <a
                  href={appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#4D6EFF] hover:underline"
                >
                  {appUrl.replace("https://", "")}
                </a>
                .
              </p>
              <p>
                O tratamento de dados está descrito na{" "}
                <a
                  href="/politica-de-privacidade"
                  className="font-medium text-[#4D6EFF] hover:underline"
                >
                  Política de Privacidade
                </a>{" "}
                e as condições de contratação nos{" "}
                <a
                  href="/termos-de-uso"
                  className="font-medium text-[#4D6EFF] hover:underline"
                >
                  Termos de Uso
                </a>
                . Mais sobre a operadora em{" "}
                <a
                  href="/sobre"
                  className="font-medium text-[#4D6EFF] hover:underline"
                >
                  Sobre a léia
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
