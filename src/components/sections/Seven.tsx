import { appRoutes, whatsappLink, whatsappMessages } from "@/lib/site";

/**
 * Formata valores em reais no padrão pt-BR. A maioria dos preços da tabela é
 * inteira, mas o excedente é cobrado por conversa (R$ 0,65), então o número de
 * casas acompanha o valor em vez de ser fixo: duas casas fixas escreveriam
 * "R$ 350,00" nos preços cheios, e zero truncaria o centavo do excedente.
 */
const brl = (value: number) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  });

/**
 * A tarifa da Administradora tem duas partes que se somam, e é por isso que o
 * card dela mostra duas linhas de natureza diferente: uma taxa por condomínio,
 * que cobre estar no ar, e um pool de conversas que a carteira inteira divide.
 * O condomínio silencioso quase não consome o pool; o movimentado puxa mais —
 * a administradora administra um pool só.
 *
 * O pool aparece como "a partir de" em vez da tabela dos seis pacotes: o
 * tamanho certo depende do consumo da carteira, que o visitante não sabe
 * estimar sozinho, e é justamente a conversa que o botão de especialista puxa.
 *
 * O Condomínio tem preço fechado e não passa pelo pool — um prédio sozinho não
 * tem com quem dividir, e o menor pacote é dimensionado para quase sete deles.
 *
 * Os cards têm formatos de preço genuinamente diferentes, então cada um declara
 * suas próprias linhas em vez de forçar um campo `price` único. `unit` é o
 * texto ao lado do valor e é o que diferencia "R$ 350/mês" de "R$ 39 por
 * condomínio": na Administradora o valor multiplica pela carteira, não é um
 * total fechado.
 */
const plans = [
  {
    name: "Condomínio",
    description:
      "Para o condomínio que quer a léia atendendo os moradores no WhatsApp.",
    highlighted: true,
    rows: [{ price: 350, unit: "/mês", detail: "Preço fechado" }],
  },
  {
    name: "Administradora",
    description:
      "Uma taxa por condomínio e um pool de conversas que a carteira inteira divide. Documentos ilimitados.",
    highlighted: false,
    rows: [
      {
        price: 39,
        unit: "por condomínio",
        detail: "Taxa mensal, menor conforme a carteira cresce",
      },
      {
        prefix: "a partir de",
        price: 540,
        unit: "/mês",
        detail: "Pool de conversas, dimensionado com você",
      },
    ],
  },
  {
    name: "Excedente",
    description:
      "Se a carteira passar do pool contratado, o atendimento não para: só o que exceder é cobrado à parte.",
    highlighted: false,
    // Não se contrata excedente — ele é a condição dos outros dois planos
    // quando o pool acaba. Um botão "Contratar" aqui prometeria uma compra
    // que não existe, então o card informa em vez de converter.
    informational: true,
    rows: [
      {
        price: 0.65,
        unit: "por conversa",
        detail: "Cobrado apenas sobre o que passar do pool",
      },
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
      <p className="mt-5 max-w-[56ch] text-base text-tinta/70 sm:text-lg">
        Mensal, sem fidelidade, cancela quando quiser. O condomínio sozinho
        paga preço fechado. A administradora paga uma taxa por prédio e um
        pool de conversas que a carteira inteira divide — quem conversa pouco
        não paga pelo movimento de quem conversa muito.
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
              Os cards têm 1 ou 2 linhas de preço; ancorar em cima mantém a
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
                    {/*
                      "a partir de" precede o valor porque é assim que se lê —
                      depois dele, junto da unidade, sairia "R$ 540 / a partir
                      de". Só o pool usa prefixo; as demais linhas são preço
                      fechado e não o declaram.
                    */}
                    {"prefix" in row && (
                      <p
                        className={`text-xs ${
                          plan.highlighted ? "text-destaque-texto/65" : "text-tinta/55"
                        }`}
                      >
                        {row.prefix}
                      </p>
                    )}
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

            {"informational" in plan ? (
              <p className="mt-auto pt-8 text-sm text-tinta/55">
                Subir de pool sai mais barato que pagar excedente — a gente
                avisa antes de a carteira chegar lá.
              </p>
            ) : (
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
            )}
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
