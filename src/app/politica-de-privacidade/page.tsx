import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  CabecalhoLegal,
  EmailContato as EmailContatoBase,
  Lista,
  Secao,
  Termo,
} from "@/components/legal/DocumentoLegal";
import { contatoEmail, empresa } from "@/lib/site";

const title = "Política de Privacidade | léia";
const description =
  "Como a léia trata os dados pessoais de condomínios contratantes, de moradores que conversam com a assistente pelo WhatsApp e os dados obtidos por meio das APIs do Google.";

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

const atualizadoEm = "23 de agosto de 2026";

export default function PoliticaDePrivacidade() {
  return (
    <>
      <Header />
      {/* id="top": o logo do Header aponta para #top em todas as páginas. */}
      <main id="top" className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
          <CabecalhoLegal
            titulo="Política de Privacidade"
            subtitulo="léia — atendimento automatizado para condomínios"
            atualizadoEm={atualizadoEm}
          />

          <div className="mt-10 flex flex-col gap-10 leading-relaxed text-black/80">
            <p>
              Esta política descreve como a léia trata os dados pessoais de quem
              utiliza a plataforma e de quem conversa com ela pelo WhatsApp. A
              plataforma léia é operada por {empresa.razaoSocial}, inscrita no
              CNPJ sob o nº {empresa.cnpj}, com sede em{" "}
              {empresa.endereco.logradouro}, {empresa.endereco.bairro},{" "}
              {empresa.endereco.cidade} — {empresa.endereco.estado}.
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

            <Secao titulo="4. Base legal do tratamento">
              <p>
                Tratamos dados pessoais com fundamento nas hipóteses do art. 7º
                da Lei Geral de Proteção de Dados (Lei nº 13.709/2018):
              </p>
              <Lista
                itens={[
                  <>
                    <Termo>Execução de contrato (art. 7º, V)</Termo> — dados
                    cadastrais e de cobrança do condomínio ou administradora
                    contratante, necessários para prestar o serviço.
                  </>,
                  <>
                    <Termo>
                      Legítimo interesse (art. 7º, IX)
                    </Termo>{" "}
                    — mensagens enviadas pelo morador ao canal de atendimento do
                    condomínio, tratadas para responder à própria solicitação
                    que ele iniciou, bem como registros técnicos usados para
                    manter a segurança e o funcionamento da plataforma.
                  </>,
                  <>
                    <Termo>Cumprimento de obrigação legal (art. 7º, II)</Termo>{" "}
                    — retenção de informações quando exigida por lei ou por
                    autoridade competente.
                  </>,
                ]}
              />
              <p>
                Nas hipóteses baseadas em legítimo interesse, o titular pode
                solicitar informações sobre a avaliação realizada e opor-se ao
                tratamento pelo e-mail indicado na seção de contato.
              </p>
            </Secao>

            <Secao titulo="5. Papéis das partes">
              <p>
                O condomínio ou a administradora que contrata a léia atua como{" "}
                <Termo>controlador</Termo> dos dados dos moradores, pois define
                a finalidade do atendimento e o conteúdo que orienta as
                respostas. A {empresa.razaoSocial} atua como{" "}
                <Termo>operadora</Termo>, tratando esses dados conforme as
                instruções do contratante e as finalidades descritas nesta
                política.
              </p>
              <p>
                Em relação aos dados cadastrais do próprio contratante, a{" "}
                {empresa.razaoSocial} atua como controladora.
              </p>
            </Secao>

            <Secao titulo="6. Com quem compartilhamos">
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

            <Secao titulo="7. Dados obtidos por meio das APIs do Google">
              <p>
                O síndico pode conectar a agenda do Google do condomínio à léia
                para que as reservas de áreas comuns — salão de festas,
                churrasqueira, quadra e semelhantes — apareçam automaticamente
                no Google Calendar. Essa conexão é opcional: só acontece quando
                o síndico conecta a conta e autoriza o acesso pelo painel da
                léia, e pode ser desfeita quando ele quiser. Nenhum morador
                conecta conta Google.
              </p>

              <p className="font-medium text-black">O que acessamos:</p>
              <Lista
                itens={[
                  <>
                    <Termo>Os eventos de reserva na agenda escolhida</Termo> —
                    a léia cria, edita e apaga os eventos correspondentes às
                    reservas de áreas comuns do condomínio.
                  </>,
                  <>
                    <Termo>A lista de agendas da conta</Termo> — apenas os
                    nomes das agendas, para que o síndico escolha em qual delas
                    as reservas devem entrar.
                  </>,
                  <>
                    <Termo>O endereço de e-mail da conta conectada</Termo> —
                    para identificar qual conta Google foi vinculada e exibir
                    essa informação no painel.
                  </>,
                ]}
              />

              <p>
                Esses dados são usados exclusivamente para refletir as reservas
                de áreas comuns do condomínio na agenda, e para nada além
                disso.
              </p>

              <p>
                Os dados obtidos por meio das APIs do Google{" "}
                <Termo>não são vendidos</Termo>,{" "}
                <Termo>não são usados para publicidade</Termo>,{" "}
                <Termo>não são compartilhados com terceiros</Termo> — exceto
                quando necessário para operar o próprio serviço ou por exigência
                legal — e{" "}
                <Termo>
                  não são usados para treinar modelos de inteligência artificial
                </Termo>
                .
              </p>

              <p>
                O uso e a transferência, pela léia, de informações recebidas das
                APIs do Google obedecem à{" "}
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#4D6EFF] hover:underline"
                >
                  Política de Dados do Usuário dos Serviços de API do Google
                </a>
                , incluindo os requisitos de Uso Limitado.
              </p>

              <p className="font-medium text-black">Como revogar o acesso:</p>
              <Lista
                itens={[
                  <>
                    <Termo>Pelo painel da léia</Termo> — desconectando a agenda
                    do Google nas configurações do condomínio;
                  </>,
                  <>
                    <Termo>Pela sua Conta Google</Termo> — em{" "}
                    <a
                      href="https://myaccount.google.com/permissions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#4D6EFF] hover:underline"
                    >
                      myaccount.google.com/permissions
                    </a>
                    , removendo o acesso concedido à léia.
                  </>,
                ]}
              />

              <p>
                Ao revogar o acesso por qualquer um dos caminhos, a léia deixa
                imediatamente de escrever na agenda. Os eventos já criados
                permanecem no Google Calendar, sob controle exclusivo do
                síndico, que pode mantê-los ou removê-los como preferir.
              </p>

              <p>
                O token de acesso à conta Google fica guardado apenas enquanto a
                agenda estiver conectada, e é apagado assim que o síndico
                desconecta a agenda ou revoga o acesso. Encerrado o contrato,
                eventuais registros remanescentes seguem o mesmo prazo da seção
                &ldquo;Por quanto tempo guardamos&rdquo;: exclusão ou
                anonimização em até 90 dias.
              </p>
            </Secao>

            <Secao titulo="8. Por quanto tempo guardamos">
              <p>
                As conversas são mantidas enquanto o condomínio for cliente,
                para que o histórico de atendimento permaneça disponível.
                Encerrado o contrato, os dados são excluídos ou anonimizados em
                até 90 dias, salvo obrigação legal de retenção por prazo maior.
              </p>
            </Secao>

            <Secao titulo="9. Seus direitos">
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

            <Secao titulo="10. Como deixar de receber mensagens">
              <p>
                Se você não quiser mais conversar com a assistente, basta enviar
                &ldquo;parar&rdquo; ou &ldquo;sair&rdquo; pelo WhatsApp, ou
                bloquear o número no próprio aplicativo. Você também pode pedir
                a exclusão do seu histórico pelo e-mail acima.
              </p>
            </Secao>

            <Secao titulo="11. Segurança">
              <p>
                As comunicações trafegam por conexões criptografadas e o acesso
                aos dados é restrito a quem precisa dele para operar o serviço.
                Nenhum sistema é totalmente imune a incidentes; caso ocorra
                algum que traga risco relevante, comunicaremos os titulares
                afetados e a autoridade competente, conforme a legislação.
              </p>
            </Secao>

            <Secao titulo="12. Crianças e adolescentes">
              <p>
                A plataforma é destinada a maiores de 18 anos. Não coletamos
                intencionalmente dados de crianças. Se identificarmos esse tipo
                de coleta, os dados serão excluídos.
              </p>
            </Secao>

            <Secao titulo="13. Alterações desta política">
              <p>
                Podemos atualizar este documento. Quando houver mudança
                relevante, a data de atualização no topo será alterada e, se
                necessário, avisaremos os contratantes.
              </p>
            </Secao>

            <Secao titulo="14. Contato">
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

/** Atalho local: o e-mail de contato é sempre o mesmo nesta página. */
function EmailContato() {
  return <EmailContatoBase email={contatoEmail} />;
}
