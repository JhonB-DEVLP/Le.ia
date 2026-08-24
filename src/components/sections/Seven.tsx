import Image from "next/image";
import { appRoutes, whatsappLink, whatsappMessages } from "@/lib/site";

/**
 * Formata valores em reais sem centavos (todos os preços da tabela são
 * inteiros). Centraliza o separador de milhar pt-BR, usado tanto nos preços
 * quanto nas cotas de conversas.
 */
const brl = (value: number) => value.toLocaleString("pt-BR");

/**
 * Os três cards de plano têm formatos de preço genuinamente diferentes —
 * dois níveis mensais, preço unitário por faixa de volume e pacotes avulsos —
 * então cada um declara suas próprias linhas de preço em vez de forçar um
 * campo `price` único. `unit` é o texto ao lado do valor e é o que diferencia
 * "R$ 380/mês" de "R$ 250 por assistente": na Administradora o valor
 * multiplica pelo número de assistentes, não é um total fechado.
 */
const plans = [
  {
    name: "Condomínio",
    description:
      "Para o condomínio que quer a léia atendendo os moradores no WhatsApp.",
    highlighted: true,
    rows: [
      { price: 380, unit: "/mês", detail: "500 conversas" },
      { price: 500, unit: "/mês", detail: "1.000 conversas" },
    ],
    footnote: "Documentos ilimitados nos dois níveis.",
  },
  {
    name: "Administradora",
    description:
      "Preço por assistente, com desconto por volume. Cada assistente inclui 500 conversas e documentos ilimitados.",
    highlighted: false,
    rows: [
      { price: 250, unit: "por assistente", detail: "Até 10 assistentes" },
      { price: 230, unit: "por assistente", detail: "De 11 a 20 assistentes" },
      { price: 220, unit: "por assistente", detail: "De 21 a 30 assistentes" },
    ],
    // Sem um total concreto, "R$ 250" é lido como preço fechado do plano.
    footnote: "Exemplo: 10 assistentes = R$ 2.500/mês.",
  },
  {
    name: "Conversas Extras",
    description:
      "Para quem usa toda a cota antes do fim do mês. Pacote avulso, somado à franquia do plano.",
    highlighted: false,
    rows: [
      { price: 200, unit: "pagamento único", detail: "500 conversas extras" },
      { price: 380, unit: "pagamento único", detail: "1.000 conversas extras" },
    ],
    footnote: null,
  },
];

/**
 * Módulos são contratados separadamente e cobrados por instância (cada
 * condomínio/agente), somados à mensalidade do plano.
 *
 * `freeDays` difere entre os módulos (30 e 60) e cada período corre de forma
 * independente, a partir da criação da conta — por isso o prazo é exibido
 * dentro de cada card e nunca como uma frase única da seção, que sugeriria um
 * período comum aos dois.
 */
const modules = [
  {
    name: "Módulo\nFinanceiro",
    description:
      "Consulta de taxas e solicitação de segundas vias de boletos/PIX",
    price: 100,
    priceNote: "Por agente/condomínio",
    freeDays: 30,
  },
  {
    name: "Módulo de\nReservas",
    description: "Recebimento de reservas via WhatsApp",
    price: 100,
    priceNote: "Por agente/condomínio",
    freeDays: 60,
  },
];

export default function Seven({
  whatsappHref = whatsappLink(whatsappMessages.especialista),
}: {
  whatsappHref?: string;
}) {
  return (
    <section id="planos" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <h2 className="text-center text-2xl font-semibold sm:text-3xl">
        Planos e preços
      </h2>
      <p className="mx-auto mt-4 max-w-3xl text-center text-base text-black/70">
        Escolha o plano do seu condomínio ou da sua administradora. Os planos
        são mensais, sem fidelidade, e você cancela quando quiser.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col rounded-2xl bg-white p-6 shadow-md sm:p-8 ${
              plan.highlighted
                ? "border-2 border-[#4D6EFF]"
                : "border border-black/5"
            }`}
          >
            <h3 className="text-center text-xl font-bold tracking-widest text-[#4D6EFF] uppercase">
              {plan.name}
            </h3>

            <hr className="mt-6 border-black/10" />

            <p className="mt-6 text-center font-semibold text-black">
              {plan.description}
            </p>

            {/*
              `mt-auto` ancora o bloco de preços na base do card: as descrições
              têm alturas diferentes entre os cards e, sem isso, os preços
              começariam em alturas distintas.
            */}
            <div className="mt-auto space-y-4 pt-6">
              {plan.rows.map((row) => (
                <div
                  key={row.detail}
                  className="rounded-xl bg-[#E4E8FB] px-4 py-4 text-center"
                >
                  <p>
                    <span className="align-top text-base font-semibold text-black">
                      R$
                    </span>
                    <span className="text-4xl font-bold text-black">
                      {brl(row.price)}
                    </span>
                    <span className="ml-1 text-sm font-medium text-black/60">
                      {row.unit}
                    </span>
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#0A2472]">
                    {row.detail}
                  </p>
                </div>
              ))}
            </div>

            {plan.footnote && (
              <p className="mt-4 text-center text-sm text-black/60">
                {plan.footnote}
              </p>
            )}

            <a
              href={appRoutes.cadastro}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mt-8 rounded-[5px] bg-[#4D6EFF] px-8 py-3 font-medium text-white transition-colors hover:bg-[#3d5ce6]"
            >
              Contratar
            </a>
          </div>
        ))}
      </div>

      <h3 className="mt-14 text-center text-xl font-semibold sm:mt-20 sm:text-2xl">
        Módulos adicionais
      </h3>
      <p className="mx-auto mt-4 max-w-3xl text-center text-base text-black/70">
        Os módulos são contratados separadamente e cobrados por instância —
        cada condomínio ou agente —, somados à mensalidade do plano.
      </p>

      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 sm:mt-12 sm:gap-8 md:grid-cols-2">
        {modules.map((module) => (
          <div
            key={module.name}
            className="flex flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-md sm:p-8"
          >
            <h4 className="whitespace-pre-line text-center text-lg font-bold tracking-widest text-[#4D6EFF] uppercase sm:text-xl">
              {module.name}
            </h4>

            <p className="mt-6 text-center font-semibold text-black">
              {module.description}
            </p>

            <div className="mt-auto pt-6 text-center">
              <span className="align-top text-lg font-semibold text-black">
                R$
              </span>
              <span className="text-5xl font-bold text-black">
                {brl(module.price)}
              </span>
              <p className="mt-1 text-sm text-black/50">{module.priceNote}</p>
              <p className="mt-3 rounded-xl bg-[#E4E8FB] px-4 py-2 text-sm font-semibold text-[#0A2472]">
                Grátis nos primeiros {module.freeDays} dias
              </p>
            </div>
          </div>
        ))}
      </div>

      {/*
        A dúvida previsível do visitante é o que conta como "conversa": a
        definição fica ao pé da tabela, logo depois das cotas.
      */}
      <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-black/60">
        Uma conversa é o atendimento a um morador dentro de uma janela de 24
        horas, incluindo todas as mensagens trocadas nesse período. O prazo
        gratuito de cada módulo é independente: começa a contar quando a conta
        é criada e termina no seu próprio prazo.
      </p>

      <div className="mt-14 flex flex-col overflow-hidden rounded-3xl shadow-md sm:mt-20 md:flex-row">
        <div className="relative h-72 w-full md:h-auto md:w-2/5">
          <Image
            src="/Seven/Imagem.jpg"
            alt="Equipe reunida discutindo a gestão do condomínio"
            fill
            className="object-cover object-top"
          />
        </div>

        <div className="w-full bg-[#0A2472] px-6 py-8 sm:px-8 sm:py-10 md:w-3/5 md:px-14 md:py-14">
          <svg
            width="140"
            height="16"
            viewBox="0 0 140 16"
            fill="none"
            className="text-white/60"
          >
            {Array.from({ length: 14 }).map((_, i) => (
              <line
                key={i}
                x1={i * 11 + 4}
                y1="16"
                x2={i * 11 + 12}
                y2="0"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            ))}
          </svg>

          <h3 className="mt-6 text-xl font-bold text-white sm:text-2xl md:text-3xl">
            Transforme a gestão do seu condomínio hoje mesmo
          </h3>
          <p className="mt-4 text-base text-white/80">
            Dê o primeiro passo para uma administração transparente, eficiente
            e sem dor de cabeça
          </p>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 block rounded-[5px] bg-linear-to-r from-[#FFC94D] to-[#FF8A2B] px-8 py-4 text-center font-bold tracking-wide text-[#1a1a1a] uppercase transition-opacity hover:opacity-90 sm:inline-block"
          >
            Falar com um especialista agora
          </a>
        </div>
      </div>
    </section>
  );
}
