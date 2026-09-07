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
  },
];

/**
 * Módulos são contratados separadamente e cobrados por instância (cada
 * condomínio/agente), somados à mensalidade do plano.
 *
 * `freeDays` difere entre os módulos (30 e 60) e cada período corre de forma
 * independente, a partir da criação da conta — por isso o prazo é exibido
 * dentro de cada card. Não o consolide em uma frase única da seção: isso
 * sugeriria um período comum aos dois.
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
    <section id="planos" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <h2 className="display max-w-[16ch] text-3xl text-tinta sm:text-4xl">
        Planos e preços
      </h2>
      <p className="mt-5 max-w-[52ch] text-base text-tinta/70 sm:text-lg">
        Mensal, sem fidelidade, cancela quando quiser. Escolha pelo tamanho
        da operação: um condomínio só, ou uma carteira inteira.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col rounded-2xl p-6 sm:p-7 ${
              plan.highlighted
                ? "bg-destaque text-destaque-texto ring-1 ring-destaque"
                : "bg-fundo ring-1 ring-borda"
            }`}
          >
            <h3
              className={`display text-xl ${
                plan.highlighted ? "text-destaque-texto" : "text-tinta"
              }`}
            >
              {plan.name}
            </h3>
            <p
              className={`mt-3 text-sm leading-relaxed ${
                plan.highlighted ? "text-destaque-texto/75" : "text-tinta/65"
              }`}
            >
              {plan.description}
            </p>

            {/*
              Os cards têm 2 ou 3 linhas de preço; ancorar em cima mantém a
              primeira linha na mesma altura nos três, e a sobra vai para
              baixo, absorvida pelo `mt-auto` do botão.
            */}
            <div className="mt-7 flex flex-col gap-3">
              {plan.rows.map((row) => (
                /*
                  Valor e unidade ficam empilhados: as unidades variam muito
                  de comprimento ("/mês" x "pagamento único") e, na mesma
                  linha, as longas quebravam e desalinhavam os preços.
                */
                <div
                  key={row.detail}
                  className={`flex items-start justify-between gap-4 border-t pt-3 ${
                    plan.highlighted ? "border-white/20" : "border-borda"
                  }`}
                >
                  <div>
                    <p className="whitespace-nowrap">
                      <span
                        className={`text-sm font-medium ${
                          plan.highlighted ? "text-destaque-texto/65" : "text-tinta/55"
                        }`}
                      >
                        R$&nbsp;
                      </span>
                      <span
                        className={`display text-3xl ${
                          plan.highlighted ? "text-destaque-texto" : "text-tinta"
                        }`}
                      >
                        {brl(row.price)}
                      </span>
                    </p>
                    <p
                      className={`text-xs ${
                        plan.highlighted ? "text-destaque-texto/65" : "text-tinta/55"
                      }`}
                    >
                      {row.unit}
                    </p>
                  </div>
                  <span
                    className={`max-w-[11rem] pt-1 text-right text-sm text-balance ${
                      plan.highlighted ? "text-destaque-texto/85" : "text-tinta/70"
                    }`}
                  >
                    {row.detail}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={appRoutes.cadastro}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-auto block rounded-full px-6 py-3 text-center font-semibold transition-colors ${
                plan.highlighted
                  ? "mt-8 bg-white text-[#0b1a4a] hover:bg-white/90"
                  : "mt-8 bg-azul text-sobre-azul hover:bg-royal"
              }`}
            >
              Contratar
            </a>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-8 border-t border-borda pt-10 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
        <div>
          <h3 className="display text-2xl text-tinta">Módulos adicionais</h3>
          <p className="mt-3 max-w-[36ch] text-base text-tinta/70">
            Contratados à parte e cobrados por condomínio, somados à
            mensalidade do plano.
          </p>
        </div>

        <div className="flex flex-col">
          {modules.map((module) => (
            <div
              key={module.name}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-borda py-5 first:border-t"
            >
              <div className="min-w-[15rem] flex-1">
                <h4 className="font-semibold text-tinta">
                  {module.name}
                </h4>
                <p className="mt-1 text-sm text-tinta/65">
                  {module.description}
                </p>
              </div>
              <div className="text-right">
                <p className="whitespace-nowrap text-tinta">
                  <span className="text-sm text-tinta/50">R$&nbsp;</span>
                  <span className="display text-2xl">{brl(module.price)}</span>
                  <span className="ml-1 text-xs text-tinta/50">
                    {module.priceNote.toLowerCase()}
                  </span>
                </p>
                {/*
                  Os períodos de cortesia diferem entre os módulos (30 e 60
                  dias) e correm de forma independente, por isso o prazo fica
                  em cada linha e não em uma frase única da seção.
                */}
                <p className="mt-1 text-sm font-medium text-azul">
                  Grátis nos primeiros {module.freeDays} dias
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 flex flex-col items-start gap-6 rounded-2xl bg-papel px-6 py-10 sm:px-10 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="display max-w-[20ch] text-2xl text-tinta sm:text-3xl">
            Ainda em dúvida sobre qual plano faz sentido?
          </h3>
          <p className="mt-3 max-w-[46ch] text-base text-tinta/70">
            Conte quantos condomínios você atende e a gente calcula com você,
            sem compromisso.
          </p>
        </div>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full bg-azul px-7 py-3.5 font-semibold text-sobre-azul transition-colors hover:bg-royal"
        >
          Falar com um especialista
        </a>
      </div>
    </section>
  );
}
