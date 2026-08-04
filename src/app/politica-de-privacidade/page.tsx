import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { contatoEmail, empresa } from "@/lib/site";

const title = "Política de Privacidade | léia";
const description =
  "Como a léia trata os dados pessoais de condomínios contratantes e de moradores que conversam com a assistente pelo WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/politica-de-privacidade",
  },
  openGraph: {
    title,
    description,
    url: "/politica-de-privacidade",
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

const atualizadoEm = "4 de agosto de 2026";

export default function PoliticaDePrivacidade() {
  return (
    <>
      <Header />
      {/* id="top": o logo do Header aponta para #top em todas as páginas. */}
      <main id="top" className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
          <h1 className="text-3xl font-semibold text-black sm:text-4xl">
            Política de Privacidade
          </h1>
          <p className="mt-3 text-black/70">
            léia — atendimento automatizado para condomínios
          </p>
          <p className="mt-1 text-sm text-black/50">
            Última atualização: {atualizadoEm}
          </p>

          <div className="mt-10 flex flex-col gap-10 leading-relaxed text-black/80">
            <p>
              Esta política descreve como a léia trata os dados pessoais de quem
              utiliza a plataforma e de quem conversa com ela pelo WhatsApp. A
              operadora do serviço é a {empresa.nome}, inscrita no CNPJ sob o nº{" "}
              {empresa.cnpj}.
            </p>

            <Secao titulo="1. Quem somos">
              <p>
                A léia é uma assistente virtual contratada por condomínios para
                responder dúvidas de moradores pelo WhatsApp — horários de áreas
                comuns, regras do regimento interno, encomendas, avisos de
                assembleia e assuntos administrativos semelhantes. O condomínio
                é o contratante; o morador é quem conversa com a assistente.
              </p>
            </Secao>

            <Secao titulo="2. Dados que coletamos">
              <p className="font-medium text-black">
                Do condomínio contratante:
              </p>
              <Lista
                itens={[
                  "Nome, e-mail e telefone da pessoa responsável pela conta;",
                  "Dados cadastrais do condomínio e informações de cobrança;",
                  "Documentos que o condomínio opte por disponibilizar à assistente, como regimento interno, convenção e comunicados.",
                ]}
              />

              <p className="font-medium text-black">
                Do morador que conversa pelo WhatsApp:
              </p>
              <Lista
                itens={[
                  "Número de telefone e nome de perfil exibido no WhatsApp;",
                  "Conteúdo das mensagens enviadas, incluindo texto, áudio e imagens;",
                  "Data e hora das mensagens.",
                ]}
              />

              <p>
                Não coletamos dados de localização, lista de contatos, nem
                qualquer informação do aparelho além do necessário para receber
                e responder mensagens.
              </p>
            </Secao>

            <Secao titulo="3. Para que usamos os dados">
              <Lista
                itens={[
                  <>
                    <Termo>Responder ao morador.</Termo> A mensagem é processada
                    para que a assistente encontre a informação pertinente e
                    formule a resposta.
                  </>,
                  <>
                    <Termo>Manter o contexto da conversa.</Termo> O histórico
                    recente é consultado para que a assistente não perca o fio
                    do diálogo.
                  </>,
                  <>
                    <Termo>Transcrever áudios.</Termo> Mensagens de voz são
                    convertidas em texto para que possam ser compreendidas e
                    respondidas.
                  </>,
                  <>
                    <Termo>Operar e melhorar o serviço.</Termo> Registros
                    técnicos são usados para diagnosticar falhas e manter a
                    plataforma em funcionamento.
                  </>,
                ]}
              />
              <p>
                Não vendemos dados pessoais e não os utilizamos para publicidade
                de terceiros.
              </p>
            </Secao>

            <Secao titulo="4. Com quem compartilhamos">
              <p>
                Compartilhamos dados apenas com os prestadores necessários para
                o serviço funcionar, e somente na medida do necessário:
              </p>
              <Lista
                itens={[
                  <>
                    <Termo>Meta / WhatsApp</Termo> — entrega das mensagens ao
                    aplicativo;
                  </>,
                  <>
                    <Termo>Twilio</Termo> — intermediação técnica do canal de
                    mensagens;
                  </>,
                  <>
                    <Termo>Provedores de inteligência artificial</Termo> —
                    processamento do texto para gerar a resposta e transcrição
                    de áudios;
                  </>,
                  <>
                    <Termo>Serviços de infraestrutura</Termo> — hospedagem e
                    banco de dados.
                  </>,
                ]}
              />
              <p>
                O condomínio contratante tem acesso às conversas mantidas com a
                assistente, na condição de responsável pelo atendimento aos seus
                moradores.
              </p>
              <p>
                Podemos ainda divulgar informações quando exigido por lei ou por
                ordem de autoridade competente.
              </p>
            </Secao>

            <Secao titulo="5. Por quanto tempo guardamos">
              <p>
                As conversas são mantidas enquanto o condomínio for cliente,
                para que o histórico de atendimento permaneça disponível.
                Encerrado o contrato, os dados são excluídos ou anonimizados em
                até 90 dias, salvo obrigação legal de retenção por prazo maior.
              </p>
            </Secao>

            <Secao titulo="6. Seus direitos">
              <p>
                Nos termos da Lei Geral de Proteção de Dados (Lei nº
                13.709/2018), você pode solicitar a qualquer momento:
              </p>
              <Lista
                itens={[
                  "Confirmação de que tratamos seus dados e acesso a eles;",
                  "Correção de dados incompletos ou desatualizados;",
                  "Exclusão dos seus dados;",
                  "Portabilidade a outro fornecedor;",
                  "Informação sobre com quem compartilhamos seus dados;",
                  "Revogação do consentimento.",
                ]}
              />
              <p>
                Para exercer qualquer um desses direitos, escreva para{" "}
                <EmailContato />. Respondemos em até 15 dias.
              </p>
            </Secao>

            <Secao titulo="7. Como deixar de receber mensagens">
              <p>
                Se você não quiser mais conversar com a assistente, basta enviar
                &ldquo;parar&rdquo; ou &ldquo;sair&rdquo; pelo WhatsApp, ou
                bloquear o número no próprio aplicativo. Você também pode pedir
                a exclusão do seu histórico pelo e-mail acima.
              </p>
            </Secao>

            <Secao titulo="8. Segurança">
              <p>
                As comunicações trafegam por conexões criptografadas e o acesso
                aos dados é restrito a quem precisa dele para operar o serviço.
                Nenhum sistema é totalmente imune a incidentes; caso ocorra
                algum que traga risco relevante, comunicaremos os titulares
                afetados e a autoridade competente, conforme a legislação.
              </p>
            </Secao>

            <Secao titulo="9. Crianças e adolescentes">
              <p>
                A plataforma é destinada a maiores de 18 anos. Não coletamos
                intencionalmente dados de crianças. Se identificarmos esse tipo
                de coleta, os dados serão excluídos.
              </p>
            </Secao>

            <Secao titulo="10. Alterações desta política">
              <p>
                Podemos atualizar este documento. Quando houver mudança
                relevante, a data de atualização no topo será alterada e, se
                necessário, avisaremos os contratantes.
              </p>
            </Secao>

            <Secao titulo="11. Contato">
              <p>
                Dúvidas sobre privacidade ou sobre esta política:
                <br />
                {empresa.nome}
                <br />
                E-mail: <EmailContato />
              </p>
            </Secao>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Secao({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-black sm:text-2xl">{titulo}</h2>
      {children}
    </section>
  );
}

function Lista({ itens }: { itens: React.ReactNode[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-[#4D6EFF]">
      {itens.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

/** Destaque do rótulo que abre alguns itens de lista. */
function Termo({ children }: { children: React.ReactNode }) {
  return <strong className="font-medium text-black">{children}</strong>;
}

function EmailContato() {
  return (
    <a
      href={`mailto:${contatoEmail}`}
      className="font-medium text-[#4D6EFF] hover:underline"
    >
      {contatoEmail}
    </a>
  );
}
