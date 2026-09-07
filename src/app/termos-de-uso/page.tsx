import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  CabecalhoLegal,
  EmailContato,
  Lista,
  Secao,
  Termo,
} from "@/components/legal/DocumentoLegal";
import { contatoEmail, empresa, siteUrl } from "@/lib/site";

const title = "Termos de Uso | léia";
const description =
  "Condições de contratação e uso da plataforma léia, assistente de atendimento automatizado por WhatsApp para condomínios, operada por Herbie IA LTDA.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/termos-de-uso",
  },
  openGraph: {
    title,
    description,
    url: "/termos-de-uso",
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

const atualizadoEm = "8 de agosto de 2026";

export default function TermosDeUso() {
  return (
    <>
      <Header />
      {/* id="top": o logo do Header aponta para #top em todas as páginas. */}
      <main id="top" className="bg-fundo">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
          <CabecalhoLegal
            titulo="Termos de Uso"
            subtitulo="léia — atendimento automatizado para condomínios"
            atualizadoEm={atualizadoEm}
          />

          <div className="mt-10 flex flex-col gap-10 leading-relaxed text-tinta/80">
            <p>
              Estes Termos regulam o acesso e o uso da plataforma léia,
              disponibilizada por {empresa.razaoSocial}, inscrita no CNPJ sob o
              nº {empresa.cnpj}, com sede em {empresa.endereco.logradouro},{" "}
              {empresa.endereco.bairro}, {empresa.endereco.cidade} —{" "}
              {empresa.endereco.estado} ({empresa.endereco.pais}), doravante
              denominada &ldquo;Herbie&rdquo;. Ao contratar ou utilizar a
              plataforma, o Contratante declara que leu e concorda com estas
              condições.
            </p>

            <Secao titulo="1. Definições">
              <Lista
                itens={[
                  <>
                    <Termo>Plataforma</Termo> ou <Termo>léia</Termo> — o serviço
                    de atendimento automatizado por WhatsApp e o painel web de
                    gestão disponibilizados pela Herbie.
                  </>,
                  <>
                    <Termo>Contratante</Termo> — a administradora de
                    condomínios, o síndico profissional ou o condomínio que
                    contrata a plataforma e é responsável pela conta.
                  </>,
                  <>
                    <Termo>Usuário Final</Termo> — o morador ou terceiro que
                    envia mensagens ao número de WhatsApp operado pelo
                    Contratante e é atendido pela assistente.
                  </>,
                  <>
                    <Termo>Conteúdo do Contratante</Termo> — documentos,
                    regimentos, convenções, textos e demais informações que o
                    Contratante disponibiliza para que a assistente formule suas
                    respostas.
                  </>,
                ]}
              />
            </Secao>

            <Secao titulo="2. O que a plataforma faz">
              <p>
                A léia recebe mensagens enviadas por Usuários Finais ao número
                de WhatsApp do Contratante e responde de forma automatizada, com
                base no Conteúdo do Contratante. A plataforma inclui ainda um
                painel web em que o Contratante pode cadastrar e atualizar
                documentos, acompanhar conversas, assumir manualmente o
                atendimento e enviar comunicados.
              </p>
              <p>
                O atendimento é prestado por sistema de inteligência artificial.
                Quando a assistente identifica que o assunto exige tratamento
                humano, a conversa é encaminhada às pessoas indicadas pelo
                Contratante.
              </p>
            </Secao>

            <Secao titulo="3. Cadastro e responsabilidade pela conta">
              <p>
                O acesso ao painel é pessoal e intransferível. O Contratante é
                responsável por manter a confidencialidade das credenciais e por
                todas as ações praticadas por seus usuários, devendo comunicar
                imediatamente qualquer uso não autorizado.
              </p>
            </Secao>

            <Secao titulo="4. Obrigações do Contratante">
              <Lista
                itens={[
                  "Fornecer informações cadastrais verdadeiras e mantê-las atualizadas;",
                  "Assegurar que possui autorização para utilizar o número de WhatsApp conectado à plataforma;",
                  "Garantir que o Conteúdo enviado é lícito, não viola direitos de terceiros e está atualizado;",
                  "Informar seus moradores de que o atendimento daquele canal é realizado por assistente virtual;",
                  "Utilizar a plataforma em conformidade com a legislação aplicável, com estes Termos e com as políticas da Meta aplicáveis ao WhatsApp Business;",
                  "Não utilizar a plataforma para envio de mensagens não solicitadas em massa, spam, conteúdo enganoso, discriminatório ou ilícito.",
                ]}
              />
              <p>
                O Contratante é o responsável pelo relacionamento com seus
                moradores e pelo conteúdo que instrui a assistente a comunicar.
              </p>
            </Secao>

            <Secao titulo="5. Uso do WhatsApp e regras da Meta">
              <p>
                A plataforma opera sobre a infraestrutura de mensageria do
                WhatsApp, fornecida pela Meta, e depende de provedores
                intermediários de comunicação. O uso do canal está sujeito às
                políticas da Meta, incluindo as regras aplicáveis a mensagens
                comerciais e o WhatsApp Business Messaging Policy.
              </p>
              <p>
                A Herbie não responde por suspensões, limitações de envio,
                alterações de política ou indisponibilidades impostas pela Meta
                ao número do Contratante, especialmente quando decorrentes de
                descumprimento das regras da plataforma de mensageria.
              </p>
            </Secao>

            <Secao titulo="6. Limites do atendimento automatizado">
              <p>
                A assistente formula respostas a partir do Conteúdo do
                Contratante e de modelos de linguagem. Ainda que a Herbie
                empregue esforços para garantir qualidade e aderência às fontes
                fornecidas, respostas automatizadas podem conter imprecisões.
              </p>
              <p>
                A léia não substitui orientação jurídica, contábil, médica ou de
                emergência. Situações urgentes ou de risco devem ser tratadas
                pelos canais próprios do condomínio e pelos serviços públicos de
                emergência. Cabe ao Contratante revisar o Conteúdo e configurar
                os temas que a assistente pode ou não abordar.
              </p>
            </Secao>

            <Secao titulo="7. Planos, preços e pagamento">
              <p>
                Os planos vigentes, seus limites de chamados e os módulos
                adicionais são os divulgados em {siteUrl} ou os definidos em
                proposta comercial específica. A cobrança é mensal, conforme o
                plano contratado e o número de conexões de WhatsApp ativas.
              </p>
              <p>
                O atraso no pagamento pode acarretar suspensão do acesso após
                comunicação prévia. Reajustes e alterações de preço serão
                informados com antecedência mínima de 30 dias.
              </p>
            </Secao>

            <Secao titulo="8. Vigência e cancelamento">
              <p>
                A contratação é por prazo indeterminado, sem fidelidade. O
                Contratante pode solicitar o cancelamento a qualquer momento,
                com efeito ao fim do ciclo de cobrança vigente, não havendo
                multa rescisória. Valores já pagos referentes ao período em
                curso não são reembolsados proporcionalmente, salvo disposição
                legal em contrário.
              </p>
              <p>
                A Herbie pode suspender ou encerrar o acesso em caso de violação
                destes Termos, uso ilícito da plataforma ou determinação de
                autoridade competente.
              </p>
            </Secao>

            <Secao titulo="9. Proteção de dados">
              <p>
                O tratamento de dados pessoais realizado pela plataforma está
                descrito na{" "}
                <a
                  href="/politica-de-privacidade"
                  className="font-medium text-azul hover:underline"
                >
                  Política de Privacidade
                </a>
                , que integra estes Termos.
              </p>
              <p>
                Em relação aos dados dos Usuários Finais, o Contratante atua
                como controlador e a Herbie como operadora, nos termos da Lei nº
                13.709/2018 (LGPD), tratando os dados conforme as instruções do
                Contratante e as finalidades descritas na Política de
                Privacidade.
              </p>
            </Secao>

            <Secao titulo="10. Propriedade intelectual">
              <p>
                A plataforma, sua marca, interface, código e documentação são de
                titularidade da Herbie. Estes Termos não transferem qualquer
                direito de propriedade intelectual ao Contratante, que recebe
                apenas licença de uso limitada, não exclusiva e intransferível
                durante a vigência da contratação.
              </p>
              <p>
                O Conteúdo do Contratante permanece de sua titularidade. O
                Contratante autoriza a Herbie a processá-lo exclusivamente para
                a prestação do serviço.
              </p>
            </Secao>

            <Secao titulo="11. Disponibilidade e suporte">
              <p>
                A Herbie empreende esforços para manter a plataforma disponível
                de forma contínua, mas o serviço pode sofrer interrupções para
                manutenção, atualizações ou por falhas de terceiros dos quais
                depende, como provedores de mensageria, de inteligência
                artificial e de infraestrutura.
              </p>
              <p>
                O suporte é prestado pelos canais informados ao Contratante e
                pelo e-mail <EmailContato email={contatoEmail} />.
              </p>
            </Secao>

            <Secao titulo="12. Limitação de responsabilidade">
              <p>
                Na máxima extensão permitida pela legislação aplicável, a
                responsabilidade da Herbie por perdas e danos relacionados à
                plataforma fica limitada ao valor efetivamente pago pelo
                Contratante nos 12 meses anteriores ao evento que originou a
                reclamação.
              </p>
              <p>
                A Herbie não responde por danos indiretos, lucros cessantes ou
                por decisões tomadas por moradores ou pelo Contratante com base
                em respostas automatizadas.
              </p>
            </Secao>

            <Secao titulo="13. Alterações destes Termos">
              <p>
                Estes Termos podem ser atualizados. Havendo mudança relevante, a
                data de atualização no topo será alterada e o Contratante será
                comunicado pelos canais cadastrados. O uso continuado após a
                vigência da nova versão implica concordância.
              </p>
            </Secao>

            <Secao titulo="14. Lei aplicável e foro">
              <p>
                Estes Termos são regidos pelas leis brasileiras. Fica eleito o
                foro da Comarca de {empresa.endereco.cidade} —{" "}
                {empresa.endereco.estado} para dirimir controvérsias que não
                puderem ser resolvidas administrativamente, com renúncia a
                qualquer outro, por mais privilegiado que seja.
              </p>
            </Secao>

            <Secao titulo="15. Contato">
              <p>
                {empresa.razaoSocial}
                <br />
                CNPJ {empresa.cnpj}
                <br />
                {empresa.endereco.logradouro}, {empresa.endereco.bairro}
                <br />
                {empresa.endereco.cidade} — {empresa.endereco.estado},{" "}
                {empresa.endereco.pais}
                <br />
                E-mail: <EmailContato email={contatoEmail} />
              </p>
            </Secao>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
