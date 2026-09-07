import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  appUrl,
  contatoEmail,
  empresa,
  whatsappLink,
  whatsappMessages,
} from "@/lib/site";

const title = "Sobre a Herbie IA LTDA | léia";
const description =
  "A léia é a plataforma de atendimento automatizado por WhatsApp para administradoras de condomínios, operada por Herbie IA LTDA, empresa brasileira sediada em Recife (PE).";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/sobre",
  },
  openGraph: {
    title,
    description,
    url: "/sobre",
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

/** Como o serviço funciona, do ponto de vista de quem contrata. */
const comoFunciona = [
  {
    titulo: "A administradora cadastra os documentos",
    texto:
      "Pelo painel web, a administradora envia regimento interno, convenção, horários de áreas comuns e comunicados de cada condomínio que administra. Cada condomínio tem sua própria base de documentos.",
  },
  {
    titulo: "O morador pergunta pelo WhatsApp",
    texto:
      "O morador envia uma mensagem para o número de WhatsApp do condomínio, como já faria hoje. Não precisa instalar aplicativo, criar conta ou aprender nada novo.",
  },
  {
    titulo: "A léia responde com base nos documentos daquele condomínio",
    texto:
      "A assistente localiza a informação na base do condomínio correspondente e responde em segundos, 24 horas por dia, sete dias por semana.",
  },
  {
    titulo: "Quando precisa de gente, a conversa vai para uma pessoa",
    texto:
      "Situações urgentes ou fora do escopo são encaminhadas à equipe responsável, que pode assumir o atendimento manualmente pelo painel e continuar a conversa com o morador.",
  },
];

export default function Sobre() {
  return (
    <>
      <Header />
      {/* id="top": o logo do Header aponta para #top em todas as páginas. */}
      <main id="top" className="bg-fundo">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
          <h1 className="display text-3xl text-tinta sm:text-4xl">
            Sobre a léia
          </h1>
          <p className="mt-3 text-tinta/70">
            Quem opera a plataforma e como o serviço funciona
          </p>

          <div className="mt-10 flex flex-col gap-12 leading-relaxed text-tinta/80">
            <section className="flex flex-col gap-4">
              <h2 className="display text-xl text-tinta sm:text-2xl">
                O que é a léia
              </h2>
              <p>
                A léia é uma plataforma de atendimento automatizado por WhatsApp
                criada para administradoras de condomínios e síndicos
                profissionais. Ela responde às dúvidas rotineiras dos moradores
                — horários de áreas comuns, regras do regimento interno,
                reservas, documentos e comunicados — usando exclusivamente os
                documentos que a administradora cadastra para cada condomínio.
              </p>
              <p>
                Quem contrata é a administradora. O morador não paga nada, não
                instala aplicativo e não cria conta: ele conversa pelo mesmo
                WhatsApp que já usa para falar com o condomínio.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="display text-xl text-tinta sm:text-2xl">
                Como funciona
              </h2>
              <ol className="flex flex-col gap-6">
                {comoFunciona.map((etapa, i) => (
                  <li key={etapa.titulo} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-azul text-sm font-semibold text-sobre-azul"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-tinta">
                        {etapa.titulo}
                      </h3>
                      <p className="mt-1">{etapa.texto}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="display text-xl text-tinta sm:text-2xl">
                O painel da administradora
              </h2>
              <p>
                Além do atendimento automático, a administradora tem acesso a um
                painel web em{" "}
                <a
                  href={appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-azul hover:underline"
                >
                  {appUrl.replace("https://", "")}
                </a>
                , onde pode cadastrar e atualizar os documentos de cada
                condomínio, acompanhar as conversas em andamento, assumir
                manualmente um atendimento e enviar avisos aos moradores.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="display text-xl text-tinta sm:text-2xl">
                Quem opera o serviço
              </h2>
              <p>
                A léia é uma plataforma desenvolvida e operada por{" "}
                <strong className="font-medium text-tinta">
                  {empresa.razaoSocial}
                </strong>
                , empresa brasileira sediada em {empresa.endereco.cidade},{" "}
                {empresa.endereco.estado}.
              </p>

              <dl className="mt-2 flex flex-col gap-4 rounded-2xl border border-borda p-6">
                <div>
                  <dt className="text-sm font-semibold text-tinta">
                    Razão social
                  </dt>
                  <dd className="mt-1">{empresa.razaoSocial}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-tinta">CNPJ</dt>
                  <dd className="mt-1">{empresa.cnpj}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-tinta">
                    Nome comercial da plataforma
                  </dt>
                  <dd className="mt-1">léia</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-tinta">Endereço</dt>
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
                  <dt className="text-sm font-semibold text-tinta">E-mail</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${contatoEmail}`}
                      className="font-medium text-azul hover:underline"
                    >
                      {contatoEmail}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-tinta">WhatsApp</dt>
                  <dd className="mt-1">
                    <a
                      href={whatsappLink(whatsappMessages.contato)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-azul hover:underline"
                    >
                      Falar com a equipe comercial
                    </a>
                  </dd>
                </div>
              </dl>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="display text-xl text-tinta sm:text-2xl">
                Privacidade e uso responsável
              </h2>
              <p>
                O atendimento é realizado por inteligência artificial e a
                assistente se identifica como tal. Os documentos de cada
                condomínio ficam em bases separadas e são usados apenas para
                responder aos moradores daquele condomínio.
              </p>
              <p>
                Os detalhes sobre tratamento de dados estão na{" "}
                <a
                  href="/politica-de-privacidade"
                  className="font-medium text-azul hover:underline"
                >
                  Política de Privacidade
                </a>{" "}
                e as condições de contratação nos{" "}
                <a
                  href="/termos-de-uso"
                  className="font-medium text-azul hover:underline"
                >
                  Termos de Uso
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
